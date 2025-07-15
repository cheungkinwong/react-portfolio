import { create } from 'zustand';
import api from '../api/apiClient'; 

export type TechnicalSkill = {
  id: number;
  sectionId: number;
  name: string;
};

type TechnicalSkillStore = {
  technicalSkills: TechnicalSkill[];
  loading: boolean;
  fetchTechnicalSkills: () => Promise<void>;
};

export const useTechnicalSkillStore = create<TechnicalSkillStore>((set) => ({
  technicalSkills: [],
  loading: false,
  fetchTechnicalSkills: async () => {
    set({ loading: true });
    try {
      const res = await api.get<TechnicalSkill[]>('/technicalskill');
      set({ technicalSkills: res.data, loading: false });
    } catch (err) {
      console.error('Failed to fetch technical skills', err);
      set({ loading: false });
    }
  },
}));
