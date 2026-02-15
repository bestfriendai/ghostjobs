import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Mock job data (would come from store in real app)
  const job = {
    id: id,
    title: 'Senior Software Engineer',
    company: 'TechCorp',
    location: 'Remote',
    postedDate: '30 days ago',
    ghostScore: 92,
    source: 'Indeed',
    description: 'We are looking for a Senior Software Engineer to join our growing team. This is a fully remote position with competitive salary and benefits.',
    redFlags: [
      'Posted 30+ days ago',
      'No specific requirements listed',
      'Vague company description',
      'Salary not disclosed',
    ],
  };

  const getGhostLevel = (score: number) => {
    if (score >= 80) return { label: 'LIKELY GHOST', color: '#EF4444' };
    if (score >= 50) return { label: 'SUSPICIOUS', color: '#F59E0B' };
    return { label: 'LEGIT', color: '#10B981' };
  };

  const ghost = getGhostLevel(job.ghostScore);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={[styles.ghostBadge, { backgroundColor: ghost.color }]}>
          <Text style={styles.ghostBadgeText}>{ghost.label}</Text>
        </View>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>{job.company}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>📍 {job.location}</Text>
          <Text style={styles.metaText}>📅 {job.postedDate}</Text>
          <Text style={styles.metaText}>🔗 {job.source}</Text>
        </View>
      </View>

      <View style={styles.scoreSection}>
        <Text style={styles.sectionTitle}>Ghost Score</Text>
        <View style={styles.scoreCard}>
          <View style={styles.scoreBar}>
            <View
              style={[
                styles.scoreFill,
                { width: `${job.ghostScore}%`, backgroundColor: ghost.color },
              ]}
            />
          </View>
          <View style={styles.scoreDetails}>
            <Text style={[styles.scoreValue, { color: ghost.color }]}>
              {job.ghostScore}%
            </Text>
            <Text style={styles.scoreLabel}>
              {job.ghostScore >= 80
                ? 'High probability this is a ghost job'
                : job.ghostScore >= 50
                ? 'Some red flags detected'
                : 'Appears to be a legitimate posting'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.redFlagsSection}>
        <Text style={styles.sectionTitle}>🚩 Red Flags Detected</Text>
        {job.redFlags.map((flag, index) => (
          <View key={index} style={styles.redFlag}>
            <Text style={styles.redFlagIcon}>⚠️</Text>
            <Text style={styles.redFlagText}>{flag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.descriptionSection}>
        <Text style={styles.sectionTitle}>Job Description</Text>
        <Text style={styles.description}>{job.description}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Anyway</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => router.back()}
        >
          <Text style={styles.reportButtonText}>Mark as Ghost</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 16,
  },
  header: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  ghostBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  ghostBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  company: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 12,
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
  },
  scoreSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  scoreCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  scoreBar: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  scoreFill: {
    height: '100%',
    borderRadius: 6,
  },
  scoreDetails: {
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  redFlagsSection: {
    marginBottom: 16,
  },
  redFlag: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  redFlagIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  redFlagText: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  description: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  actions: {
    gap: 12,
    marginBottom: 32,
  },
  applyButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  reportButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  reportButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
});
