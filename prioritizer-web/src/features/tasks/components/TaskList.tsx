import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Paper, Typography } from '@mui/material';

interface TaskItemProps {
  id: string;
  title: string;
}

export const TaskItem = ({ id, title }: TaskItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        p: 2,
        mb: 1,
        cursor: 'grab',
        '&:hover': {
          bgcolor: 'action.hover',
        },
        bgcolor: 'background.paper',
      }}
    >
      <Typography>{title}</Typography>
    </Paper>
  );
};
