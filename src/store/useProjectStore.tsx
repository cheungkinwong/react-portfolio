import { create } from 'zustand';
import api from '../api/apiClient'; 

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
      const res = await api.get<Project[]>('/project');
      set({ projects: res.data, loading: false });
    } catch (error) {
      console.error('Failed to fetch projects', error);
      set({ loading: false });
    }
  }
}));
