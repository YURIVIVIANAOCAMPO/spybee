import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Project {
  _id: string;
  title: string;
  status: string;
  lastVisit: string;
  img: string;
  projectPlanData?: {
    plan: string;
  };
  position: {
    lat: number;
    lng: number;
  };
  users: Array<{ name: string; lastName: string }>;
  incidents: Array<{ item: string; description: string }>;
}

interface AppState {
  projects: Project[];
  filteredProjects: Project[];
  selectedProjectId: string | null;
  searchQuery: string;
  sortBy: 'alphabetical' | 'incidents' | 'rfi' | 'tasks';
  currentPage: number;
  itemsPerPage: number;
  viewMode: 'list' | 'map' | 'grid';
  isAuthenticated: boolean;
  
  // Map State
  mapCenter: [number, number];
  mapZoom: number;

  // Actions
  setProjects: (projects: Project[]) => void;
  setSelectedProject: (projectId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: 'alphabetical' | 'incidents' | 'rfi' | 'tasks') => void;
  setCurrentPage: (page: number) => void;
  setViewMode: (mode: 'list' | 'map' | 'grid') => void;
  login: () => void;
  logout: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      projects: [],
      filteredProjects: [],
      selectedProjectId: null,
      searchQuery: '',
      sortBy: 'alphabetical',
      currentPage: 1,
      itemsPerPage: 10,
      viewMode: 'map',
      isAuthenticated: false,
      
      mapCenter: [-74.1558, 4.6738],
      mapZoom: 12,

      setProjects: (projects) => {
        set({ projects, filteredProjects: projects });
        get().setSearchQuery(get().searchQuery);
      },

      setSelectedProject: (projectId) => {
        const project = get().projects.find(p => p._id === projectId);
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
        if (sortBy === 'alphabetical') filtered.sort((a, b) => a.title.localeCompare(b.title));
        if (sortBy === 'incidents') filtered.sort((a, b) => (b.incidents?.filter(i => i.item === 'incidents').length || 0) - (a.incidents?.filter(i => i.item === 'incidents').length || 0));
        if (sortBy === 'rfi') filtered.sort((a, b) => (b.incidents?.filter(i => i.item === 'RFI').length || 0) - (a.incidents?.filter(i => i.item === 'RFI').length || 0));
        if (sortBy === 'tasks') filtered.sort((a, b) => (b.incidents?.filter(i => i.item === 'task' || i.item === 'tareas').length || 0) - (a.incidents?.filter(i => i.item === 'task' || i.item === 'tareas').length || 0));

        set({ searchQuery: query, filteredProjects: filtered, currentPage: 1 });
      },

      setSortBy: (sort) => {
        set({ sortBy: sort });
        get().setSearchQuery(get().searchQuery);
      },

      setCurrentPage: (page) => set({ currentPage: page }),
      setViewMode: (mode) => set({ viewMode: mode }),
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false, selectedProjectId: null }),
    }),
    {
      name: 'spybee-auth-storage', // Nombre de la llave en LocalStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated,
        viewMode: state.viewMode 
      }), // Solo persistimos lo que queremos que se guarde tras F5
    }
  )
);
