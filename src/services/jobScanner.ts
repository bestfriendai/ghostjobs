import { Job } from '@/src/store/jobStore';

const PLATFORM_LABELS: Record<string, string> = {
  indeed: 'Indeed',
  linkedin: 'LinkedIn',
  ziprecruiter: 'ZipRecruiter',
  glassdoor: 'Glassdoor',
};

const platformFromHost = (host: string): string => {
  if (host.includes('indeed.')) return 'indeed';
  if (host.includes('linkedin.')) return 'linkedin';
  if (host.includes('ziprecruiter.')) return 'ziprecruiter';
  if (host.includes('glassdoor.')) return 'glassdoor';
  return 'web';
};

const prettyFromSlug = (value?: string): string | undefined => {
  if (!value) return undefined;
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .trim();
};

export const analyzeGhostRisk = (url: string) => {
  const parsed = new URL(url);
  const host = parsed.hostname.toLowerCase();
  const path = parsed.pathname.toLowerCase();
  const query = parsed.search.toLowerCase();

  let score = 20;
  const redFlags: string[] = [];

  if (query.includes('easy') || query.includes('quick') || query.includes('urgent')) {
    score += 20;
    redFlags.push('Urgency-heavy wording in URL metadata');
  }

  if (query.includes('remote') && query.includes('entry')) {
    score += 15;
    redFlags.push('Potentially broad, high-volume targeting keywords');
  }

  if (path.includes('apply') && !path.includes('job')) {
    score += 15;
    redFlags.push('Apply link is not tied to a canonical job listing path');
  }

  if (!host.includes('indeed.') && !host.includes('linkedin.') && !host.includes('ziprecruiter.') && !host.includes('glassdoor.')) {
    score += 20;
    redFlags.push('Listing is hosted outside major job boards');
  }

  if (path.length < 8) {
    score += 10;
    redFlags.push('Very short listing path provides little listing detail');
  }

  score = Math.max(1, Math.min(score, 99));

  return {
    score,
    redFlags,
  };
};

export const buildJobFromUrl = async (url: string): Promise<{ job: Job; redFlags: string[] }> => {
  const parsed = new URL(url);
  const host = parsed.hostname.toLowerCase();
  const platformId = platformFromHost(host);
  const platform = PLATFORM_LABELS[platformId] ?? 'Web';

  const pathParts = parsed.pathname.split('/').filter(Boolean);
  const slug = pathParts[pathParts.length - 1];
  const titleGuess =
    prettyFromSlug(parsed.searchParams.get('jk') || parsed.searchParams.get('jobId') || slug) ||
    'Unknown Role';

  const companyGuess = prettyFromSlug(parsed.searchParams.get('company')) || host.replace('www.', '');
  const locationGuess = prettyFromSlug(parsed.searchParams.get('l') || parsed.searchParams.get('location')) || 'Unknown';

  const { score, redFlags } = analyzeGhostRisk(url);

  const job: Job = {
    id: `${Date.now()}`,
    title: titleGuess,
    company: companyGuess,
    location: locationGuess,
    postedDate: 'Recently discovered',
    ghostScore: score,
    source: platform,
    url,
    description: `Imported from ${platform} listing URL.`,
    scannedAt: new Date().toISOString(),
  };

  return { job, redFlags };
};
