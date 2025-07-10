import { create } from 'zustand';
import { getBaseUrl } from '../utils/api';

type Section = {
  id: number;
  image: string;
  title: string;
  description: string;
};

type SectionStore = {
  sections: Section[];
  loading: boolean;
  setSections: (sections: Section[]) => void;
  setLoading: (loading: boolean) => void;
  fetchSections: () => Promise<void>;
};

export const useSectionStore = create<SectionStore>((set) => ({
  sections: [],
  loading: false,
  setSections: (sections) => set({ sections }),
  setLoading: (loading) => set({ loading }),
  fetchSections: async () => {
    set({ loading: true });
    try {
      const baseUrl = getBaseUrl();
      console.log('baseurl', `${baseUrl}/section`);
      const res = await fetch(`${baseUrl}/section`);
      const data = await res.json();
      set({ sections: data, loading: false });
    } catch (error) {
      console.error('Failed to fetch sections', error);
      set({ loading: false });
    }
  },
}));
