import { create } from 'zustand'
import api from '../api/apiClient'
import { getBaseUrl } from '../utils/api'

const baseUrl = getBaseUrl()

export type Project = {
  id: number
  name: string
  description: string
  link: string
  image: string
  imageUrl: string
  altText: string
}

type ProjectStore = {
  projects: Project[]
  loading: boolean
  fetchProjects: () => Promise<void>
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  loading: false,
  fetchProjects: async () => {
    set({ loading: true })
    try {
      const res = await api.get<Project[]>('/project')
      const fullProjects = res.data.map((p) => ({
        ...p,
        imageUrl: p.image ? `${baseUrl}${p.image}` : '',
      }))
      set({ projects: fullProjects, loading: false })
    } catch (error) {
      console.error('Failed to fetch projects', error)
      set({ loading: false })
    }
  },
}))
