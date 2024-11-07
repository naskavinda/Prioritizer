import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Paper, Typography, Box } from '@mui/material';
import { TaskItem } from './TaskItem';
import { Task } from '../types/task.types';

interface TaskSectionProps {
  id: string;
  title: string;
  tasks: Task[];
}

export const TaskSection = ({ id, title, tasks }: TaskSectionProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        bgcolor: isOver ? 'action.hover' : 'background.default',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'background-color 0.2s ease',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        {title}
      </Typography>
      <Box ref={setNodeRef}>
        <SortableContext 
          items={tasks.map(task => task.id)} 
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task}
            />
          ))}
        </SortableContext>
      </Box>
    </Paper>
  );
};
