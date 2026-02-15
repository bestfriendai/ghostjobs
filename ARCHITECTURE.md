# GhostJobs Architecture

## Overview

GhostJobs is a React Native mobile app that helps job seekers identify potentially fake or "ghost" job postings.

## Architecture

**Single Page App** with tab-based navigation

## Navigation

```
├── Home (index) - Job listings
├── Scanner - URL scanner
├── History - Scan history
└── Settings - Preferences
```

## State

Uses React useState for local state management:
- Jobs list
- Scan results
- History items

## Data Models

### Job

```typescript
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  ghostScore: number;
  source: string;
}
```

### ScanResult

```typescript
interface ScanResult {
  id: string;
  url: string;
  platform: Platform;
  status: 'scanning' | 'clean' | 'ghost';
  ghostScore?: number;
}
```

## Ghost Score Algorithm

Current implementation uses random simulation. Future versions could analyze:
- Company reputation
- Job posting age
- Salary realism
- Application requirements
- Company website presence

## Storage

Currently uses in-memory state. Future versions:
- AsyncStorage for history
- Cloud sync for account
