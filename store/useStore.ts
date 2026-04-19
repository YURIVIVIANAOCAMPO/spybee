import { create } from 'zustand';
import { Project, SortOption } from '../types/project';

interface AppState {
  projects: Project[];
  filteredProjects: Project[];
  searchQuery: string;
  sortBy: SortOption;
  currentPage: number;
  itemsPerPage: number;
  selectedProjectId: string | null;
  mapCenter: [number, number];
  mapZoom: number;
  user: { name: string; role: string } | null;

  setProjects: (projects: Project[]) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (option: SortOption) => void;
  setCurrentPage: (page: number) => void;
  setSelectedProject: (projectId: string | null) => void;
  applyFilters: () => void;
  login: (name: string, role: string) => void;
  logout: () => void;
}


export const useStore = create<AppState>((set, get) => ({
  projects: [],
  filteredProjects: [],
  searchQuery: '',
  sortBy: 'alphabetical',
  currentPage: 1,
  itemsPerPage: 10,
  selectedProjectId: null,
  mapCenter: [-74.006, 40.7128],
  mapZoom: 2,
  user: { name: 'Marco', role: 'Administrador' },



  setProjects: (projects) => {
    set({ projects, filteredProjects: projects });
    get().applyFilters();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1 });
    get().applyFilters();
  },

  setSortBy: (option) => {
    set({ sortBy: option });
    get().applyFilters();
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  setSelectedProject: (projectId) => {
    const project = get().projects.find((p) => p._id === projectId);
    if (project) {
      set({ 
        selectedProjectId: projectId, 
        mapCenter: [project.position.lng, project.position.lat],
        mapZoom: 14
      });
    } else {
      set({ selectedProjectId: projectId });
    }
  },

  applyFilters: () => {
    const { projects, searchQuery, sortBy } = get();
    let filtered = [...projects];

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }


    filtered.sort((a, b) => {

      if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'incidents') {
        const aCount = a.incidents.filter((i) => i.item === 'incidents').length;
        const bCount = b.incidents.filter((i) => i.item === 'incidents').length;
        return bCount - aCount;
      }
      if (sortBy === 'rfi') {
        const aCount = a.incidents.filter((i) => i.item === 'RFI').length;
        const bCount = b.incidents.filter((i) => i.item === 'RFI').length;
        return bCount - aCount;
      }
      if (sortBy === 'tasks') {
        const aCount = a.incidents.filter((i) => i.item === 'task').length;
        const bCount = b.incidents.filter((i) => i.item === 'task').length;
        return bCount - aCount;
      }
      return 0;
    });

    set({ filteredProjects: filtered });
  },

  login: (name, role) => set({ user: { name, role } }),
  logout: () => set({ user: null }),
}));

