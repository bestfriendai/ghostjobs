import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  scannedAt?: string;
}

interface JobStore {
  jobs: Job[];
  history: Job[];
  addJob: (job: Job) => void;
  addToHistory: (job: Job) => void;
  clearHistory: () => void;
  removeJob: (id: string) => void;
  getJobById: (id: string) => Job | undefined;
}

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      jobs: [],
      history: [],
      
      addJob: (job) =>
        set((state) => ({
          jobs: [job, ...state.jobs],
        })),
      
      addToHistory: (job) =>
        set((state) => ({
          history: [{ ...job, scannedAt: new Date().toISOString() }, ...state.history].slice(0, 50),
        })),
      
      clearHistory: () =>
        set({ history: [] }),
      
      removeJob: (id) =>
        set((state) => ({
          jobs: state.jobs.filter((j) => j.id !== id),
        })),

      getJobById: (id) => {
        const state = get();
        return state.jobs.find(j => j.id === id) || state.history.find(j => j.id === id);
      },
    }),
    {
      name: 'ghostjobs-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
