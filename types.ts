
export interface Task {
  id: string;
  time: string;
  label: string;
  detail?: string;
  link?: string;
  note?: string;
  warning?: string;
  iconType?: 'plane' | 'train' | 'mountain' | 'cart';
}

export interface DayMission {
  id: string;
  title: string;
  date: string;
  tasks: Task[];
}

export interface IntelData {
  label: string;
  value: string;
  subValue?: string;
  fieldId: string;
}

export interface AppState {
  completedTasks: Record<string, boolean>;
}

export enum MissionStatus {
  PLANNING = 'PLANNING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}
