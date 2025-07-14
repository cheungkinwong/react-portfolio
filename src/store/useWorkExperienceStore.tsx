import { create } from 'zustand';
import { getBaseUrl } from '../utils/api';

export type WorkExperience = {
  id: number;
  sectionId: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
};

type WorkExperienceStore = {
  workExperiences: WorkExperience[];
  loading: boolean;
  fetchWorkExperiences: () => Promise<void>;
};

export const useWorkExperienceStore = create<WorkExperienceStore>((set) => ({
  workExperiences: [],
  loading: false,
  fetchWorkExperiences: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`${getBaseUrl()}/workexperience`);
      const data = await res.json();
      set({ workExperiences: data, loading: false });
    } catch (err) {
      console.error('Failed to fetch work experiences', err);
      set({ loading: false });
    }
  },
}));