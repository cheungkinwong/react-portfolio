import { create } from 'zustand';
import { getBaseUrl } from '../utils/api';

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
      const res = await fetch(`${getBaseUrl()}/technicalskill`);
      const data = await res.json();
      set({ technicalSkills: data, loading: false });
    } catch (err) {
      console.error('Failed to fetch technical skills', err);
      set({ loading: false });
    }
  },
}));
