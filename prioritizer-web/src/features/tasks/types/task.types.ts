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
}

export interface TaskSection {
  id: string;
  title: string;
  tasks: Task[];
}
