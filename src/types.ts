export interface NavLink {
  id: string;
  label: string;
  path: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // From Lucide React
  details: string[];
}

export interface StudioStat {
  id: string;
  value: string;
  label: string;
}

export interface WorkProject {
  id: string;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
  glowColor: string;
}
