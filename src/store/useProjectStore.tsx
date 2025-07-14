import { create } from 'zustand';
import { getBaseUrl } from '../utils/api';

type Project = {
  id: number;
  name: string;
  description: string;
  link: string;
  image: string;
};

type ProjectStore = {
  projects: Project[];
  loading: boolean;
  fetchProjects: () => Promise<void>;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  loading: false,
  fetchProjects: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`${getBaseUrl()}/project`);
      const data = await res.json();
      set({ projects: data, loading: false });
    } catch (error) {
      console.error('Failed to fetch projects', error);
      set({ loading: false });
    }
  }
}));
