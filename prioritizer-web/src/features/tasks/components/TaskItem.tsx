import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Paper, 
  Typography, 
  Box, 
  Chip, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { 
  AccessTime as TimeIcon,
  Flag as FlagIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { Task } from '../types/task.types';
import { format } from 'date-fns';

interface TaskItemProps {
  task: Task;
}

const priorityColors = {
  low: 'success',
  medium: 'warning',
  high: 'error',
} as const;

export const TaskItem = ({ task }: TaskItemProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <>
      <Paper
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        elevation={isDragging ? 4 : 1}
        sx={{
          p: 2,
          mb: 1,
          cursor: 'grab',
          '&:hover': {
            bgcolor: 'action.hover',
          },
          bgcolor: 'background.paper',
          userSelect: 'none',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              {task.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
              <Chip
                size="small"
                icon={<FlagIcon />}
                label={task.priority}
                color={priorityColors[task.priority]}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TimeIcon fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  {format(task.dueDates, 'MMM dd')}
                </Typography>
              </Box>
            </Box>
          </Box>
          <IconButton size="small" onClick={() => setIsDialogOpen(true)}>
            <MoreIcon />
          </IconButton>
        </Box>
      </Paper>

      <Dialog 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {task.title}
            <Chip
              size="small"
              label={task.status}
              color={task.status === 'completed' ? 'success' : 'default'}
            />
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Description
            </Typography>
            <Typography>{task.description}</Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Priority
              </Typography>
              <Chip
                size="small"
                icon={<FlagIcon />}
                label={task.priority}
                color={priorityColors[task.priority]}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Due Date
              </Typography>
              <Typography>{format(task.dueDates, 'MMMM dd, yyyy')}</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Timeline
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2">
                Created: {format(task.createdAt, 'MMM dd, yyyy HH:mm')}
              </Typography>
              <Typography variant="body2">
                Last Updated: {format(task.updatedAt, 'MMM dd, yyyy HH:mm')}
              </Typography>
              {task.completedDate && (
                <Typography variant="body2">
                  Completed: {format(task.completedDate, 'MMM dd, yyyy HH:mm')}
                </Typography>
              )}
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Working Days
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {task.workingDays.map((day, index) => (
                <Chip
                  key={index}
                  size="small"
                  label={format(day, 'MMM dd')}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          <Button variant="contained" color="primary">
            Edit Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
