import { create } from 'zustand';
import api from '../api/apiClient'; 

export type Section = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type SectionStore = {
  sections: Section[];
  loading: boolean;
  fetchSections: () => Promise<void>;
};

export const useSectionStore = create<SectionStore>((set) => ({
  sections: [],
  loading: false,
  fetchSections: async () => {
    set({ loading: true });
    try {
      const res = await api.get<Section[]>('/section');
      set({ sections: res.data, loading: false });
    } catch (err) {
      console.error('Failed to fetch sections', err);
      set({ loading: false });
    }
  },
}));
