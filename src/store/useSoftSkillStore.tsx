import { create } from 'zustand';
import api from '../api/apiClient'; 

export type SoftSkill = {
  id: number;
  sectionId: number;
  name: string;
  level: string;
};

type SoftSkillStore = {
  softSkills: SoftSkill[];
  loading: boolean;
  fetchSoftSkills: () => Promise<void>;
};

export const useSoftSkillStore = create<SoftSkillStore>((set) => ({
  softSkills: [],
  loading: false,
  fetchSoftSkills: async () => {
    set({ loading: true });
    try {
      const res = await api.get<SoftSkill[]>('/softskill');
      set({ softSkills: res.data, loading: false });
    } catch (err) {
      console.error('Failed to fetch soft skills', err);
      set({ loading: false });
    }
  },
}));
