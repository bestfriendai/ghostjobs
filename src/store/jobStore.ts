import { create } from 'zustand';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  ghostScore: number;
  source: string;
  description?: string;
  url?: string;
}

interface JobStore {
  jobs: Job[];
  history: Job[];
  addJob: (job: Job) => void;
  addToHistory: (job: Job) => void;
  clearHistory: () => void;
  removeJob: (id: string) => void;
}

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  history: [],
  
  addJob: (job) =>
    set((state) => ({
      jobs: [job, ...state.jobs],
    })),
  
  addToHistory: (job) =>
    set((state) => ({
      history: [job, ...state.history].slice(0, 50), // Keep last 50
    })),
  
  clearHistory: () =>
    set({ history: [] }),
  
  removeJob: (id) =>
    set((state) => ({
      jobs: state.jobs.filter((j) => j.id !== id),
    })),
}));
