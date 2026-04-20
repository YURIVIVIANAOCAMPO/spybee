import { create } from 'zustand';
import { Project } from '../types/project';

interface AppState {
  projects: Project[];
  filteredProjects: Project[];
  selectedProjectId: string | null;
  searchQuery: string;
  sortBy: 'alphabetical' | 'incidents' | 'rfi' | 'tasks';
  currentPage: number;
  itemsPerPage: number;
  
  // Map State
  mapCenter: [number, number];
  mapZoom: number;

  // Actions
  setProjects: (projects: Project[]) => void;
  setSelectedProject: (projectId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: 'alphabetical' | 'incidents' | 'rfi' | 'tasks') => void;
  setCurrentPage: (page: number) => void;
}

export const useStore = create<AppState>((set, get) => ({
  projects: [],
  filteredProjects: [],
  selectedProjectId: null,
  searchQuery: '',
  sortBy: 'alphabetical',
  currentPage: 1,
  itemsPerPage: 10,
  
  mapCenter: [-74.1558, 4.6738], // Centro por defecto (Bogotá)
  mapZoom: 12,

  setProjects: (projects) => {
    set({ projects, filteredProjects: projects });
    get().setSearchQuery(get().searchQuery); // Aplicar filtros iniciales
  },

  setSelectedProject: (projectId) => {
    const project = get().projects.find((p) => p._id === projectId);
    if (project && project.position) {
      set({ 
        selectedProjectId: projectId,
        mapCenter: [project.position.lng, project.position.lat],
        mapZoom: 15
      });
    } else {
      set({ selectedProjectId: projectId });
    }
  },

  setSearchQuery: (query) => {
    const { projects, sortBy } = get();
    let filtered = projects.filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase())
    );

    // Aplicar ordenamiento
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      if (sortBy === 'incidents') return (b.incidents?.filter(i => i.item === 'incidents').length || 0) - (a.incidents?.filter(i => i.item === 'incidents').length || 0);
      if (sortBy === 'rfi') return (b.incidents?.filter(i => i.item === 'RFI').length || 0) - (a.incidents?.filter(i => i.item === 'RFI').length || 0);
      if (sortBy === 'tasks') return (b.incidents?.filter(i => i.item === 'task').length || 0) - (a.incidents?.filter(i => i.item === 'task').length || 0);
      return 0;
    });

    set({ searchQuery: query, filteredProjects: filtered, currentPage: 1 });
  },

  setSortBy: (sort) => {
    set({ sortBy: sort });
    get().setSearchQuery(get().searchQuery); // Re-filtrar y ordenar
  },

  setCurrentPage: (page) => set({ currentPage: page }),
}));
