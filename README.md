# GhostJobs 👻

Spot ghost jobs before you apply. Save time and avoid scams.

## Features

- **Job Listing**: Browse jobs with ghost score indicators
- **Ghost Score**: AI-powered rating (0-100%) showing likelihood of fake job
- **Job Scanner**: Paste job posting URLs to scan for red flags
- **Scan History**: Track all your scanned jobs
- **Multiple Platforms**: Support for Indeed, LinkedIn, ZipRecruiter, Glassdoor

## Tech Stack

- **Framework**: Expo SDK 54 with Expo Router
- **Language**: TypeScript
- **State Management**: React Context / useState
- **UI**: React Native with custom styling

## Design

- **Brand Color**: #7C3AED (Purple)
- **Style**: Clean, modern job search interface
- **Ghost Indicators**: Red (likely ghost), Yellow (suspicious), Green (legit)

## Screens

- **Home**: Job listing with search and filters
- **Scanner**: Paste job URL to scan for ghost indicators
- **History**: Past scans with statistics
- **Settings**: App preferences

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npx expo start
```

## Ghost Score System

| Score | Label | Color |
|-------|-------|-------|
| 80-100 | LIKELY GHOST | Red |
| 50-79 | SUSPICIOUS | Yellow |
| 0-49 | LEGIT | Green |

## License

MIT

## API Configuration

### Environment Variables

Create a `.env` file in the project root:

```bash
# Job API (for ghost job detection)
JOB_API_KEY=your_job_api_key
JOB_API_URL=https://api.ghostjobs.com/v1

# AI Scoring Service
AI_SCORING_KEY=your_ai_scoring_key
```

### RevenueCat Configuration

1. Create an account at [RevenueCat.com](https://revenuecat.com)
2. Create products in App Store Connect / Google Play Console:
   - Monthly: $2.99/month - `ghostjobs_monthly`
   - Annual: $14.99/year - `ghostjobs_annual`
3. Configure products in RevenueCat dashboard
4. Add your API key to the purchases service
