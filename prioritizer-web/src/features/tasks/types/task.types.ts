export interface TaskNote {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  dueDates: Date;
  completedDate?: Date;
  workingDays: Date[];
  notes: TaskNote[];
}

export interface TaskSection {
  id: string;
  title: string;
  tasks: Task[];
}
