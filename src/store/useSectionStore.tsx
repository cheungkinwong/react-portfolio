import { create } from 'zustand';
import api from '../api/apiClient'; 
import { getBaseUrl } from '../utils/api'; 
const baseUrl = getBaseUrl().replace(/\/api\/?$/, ''); 

export type Section = {
  id: number;
  title: string;
  description: string;
  altText: string;
  image: string;
  imageUrl: string; 
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
      const fullSections = res.data.map((s) => ({
        ...s,
        imageUrl: s.image ? `${baseUrl}${s.image}` : '',
      }));
      set({ sections: fullSections, loading: false });
    } catch (err) {
      console.error('Failed to fetch sections', err);
      set({ loading: false });
    }
  },
}));
