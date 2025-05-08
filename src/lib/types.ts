
export type Department = 'engineering' | 'marketing' | 'support' | 'general';

export interface DepartmentInfo {
  id: Department;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  link: string;
  type: 'confluence' | 'pdf' | 'video' | 'github' | 'form';
  department: Department;
  featured?: boolean;
  date?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  department: Department;
  date: string;
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  family: 'wisblock' | 'wisgate' | 'wisnode' | 'meshtastic';
  featured?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  department: Department | 'all';
  organizer: string;
}

export interface User {
  id?: string;
  fullName?: string;
  email: string;
  department?: Department;
}
