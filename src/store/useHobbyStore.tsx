import { create } from 'zustand';
import { getBaseUrl } from '../utils/api';

export type Hobby = {
  id: number;
  sectionId: number;
  name: string;
};

type HobbyStore = {
  hobbies: Hobby[];
  loading: boolean;
  fetchHobbies: () => Promise<void>;
};

export const useHobbyStore = create<HobbyStore>((set) => ({
  hobbies: [],
  loading: false,
  fetchHobbies: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`${getBaseUrl()}/hobby`);
      const data = await res.json();
      set({ hobbies: data, loading: false });
    } catch (err) {
      console.error('Failed to fetch hobbies', err);
      set({ loading: false });
    }
  },
}));
