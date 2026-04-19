export interface Project {
  _id: string;
  title: string;
  projectPlanData: {
    plan: string;
  };
  status: 'active' | 'suspended';
  position: {
    lat: number;
    lng: number;
  };
  users: Array<{
    name: string;
    lastName: string;
  }>;
  incidents: Array<Incident>;
  createdAt: string;
  lastVisit?: string;
}

export interface Incident {
  _id: string;
  status: 'active' | 'close';
  item: 'incidents' | 'RFI' | 'task';
  description: string;
  owner: string;
  tag: string;
  limitDate: string;
}

export type SortOption = 'alphabetical' | 'incidents' | 'rfi' | 'tasks';
