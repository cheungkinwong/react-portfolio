import { create } from 'zustand';
import { getBaseUrl } from '../utils/api';

export type Education = {
  id: number;
  sectionId: number;
  school: string;
  course: string;
  startDate: string;
  endDate: string | null;
};

type EducationStore = {
  educations: Education[];
  loading: boolean;
  fetchEducations: () => Promise<void>;
};

export const useEducationStore = create<EducationStore>((set) => ({
  educations: [],
  loading: false,
  fetchEducations: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`${getBaseUrl()}/education`);
      const data = await res.json();
      set({ educations: data, loading: false });
    } catch (err) {
      console.error('Failed to fetch educations', err);
      set({ loading: false });
    }
  },
}));