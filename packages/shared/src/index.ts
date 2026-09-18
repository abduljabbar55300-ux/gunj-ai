export type ProjectStatus = 'idea' | 'active' | 'blocked' | 'done';

export interface GunjTask {
  id: string;
  title: string;
  status: ProjectStatus;
  dueDate?: string;
  description?: string;
}

export interface GunjUserProfile {
  id: string;
  name: string;
  timezone: string;
}

export const defaultUserProfile: GunjUserProfile = {
  id: 'user-1',
  name: 'Gunj User',
  timezone: 'UTC',
};
