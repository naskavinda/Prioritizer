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
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stack,
} from '@mui/material';
import { 
  AccessTime as TimeIcon,
  Flag as FlagIcon,
  MoreVert as MoreIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { Task } from '../types/task.types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface TaskItemProps {
  task: Task;
  onUpdate?: (updatedTask: Task) => void;
}

const priorityColors = {
  low: 'success',
  medium: 'warning',
  high: 'error',
} as const;

export const TaskItem = ({ task, onUpdate }: TaskItemProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);
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

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    onUpdate?.(editedTask);
    setIsEditMode(false);
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditMode(false);
  };

  const renderViewMode = () => (
    <>
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
        <Stack spacing={3}>
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
              <Typography>{new Date(task.dueDates).toLocaleDateString()}</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Timeline
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2">
                Created: {new Date(task.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Last Updated: {new Date(task.updatedAt).toLocaleString()}
              </Typography>
              {task.completedDate && (
                <Typography variant="body2">
                  Completed: {new Date(task.completedDate).toLocaleString()}
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
                  label={new Date(day).toLocaleDateString()}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Notes
            </Typography>
            {task.notes.length === 0 ? (
              <Typography color="text.secondary" variant="body2">
                No notes added yet
              </Typography>
            ) : (
              <Stack spacing={2}>
                {task.notes.map((note) => (
                  <Paper
                    key={note.id}
                    variant="outlined"
                    sx={{ p: 2 }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                          {note.title || 'Untitled Note'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(note.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {note.content}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        <Button variant="contained" color="primary" onClick={handleEditClick}>
          Edit Task
        </Button>
      </DialogActions>
    </>
  );

  const renderEditMode = () => (
    <>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          <TextField
            label="Title"
            fullWidth
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          />

          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={editedTask.priority}
              label="Priority"
              onChange={(e) => setEditedTask({ 
                ...editedTask, 
                priority: e.target.value as Task['priority']
              })}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={editedTask.status}
              label="Status"
              onChange={(e) => {
                const newStatus = e.target.value as Task['status'];
                setEditedTask({ 
                  ...editedTask, 
                  status: newStatus,
                  completedDate: newStatus === 'completed' ? new Date() : undefined
                });
              }}
            >
              <MenuItem value="todo">Todo</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Due Date
            </Typography>
            <DatePicker
              selected={editedTask.dueDates}
              onChange={(date) => date && setEditedTask({ ...editedTask, dueDates: date })}
              dateFormat="MMMM d, yyyy"
              className="mui-datepicker"
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Add Working Day
            </Typography>
            <DatePicker
              selected={null}
              onChange={(date) => {
                if (date) {
                  setEditedTask({ 
                    ...editedTask, 
                    workingDays: [...editedTask.workingDays, date]
                  });
                }
              }}
              dateFormat="MMMM d, yyyy"
              className="mui-datepicker"
            />
          </Box>

          {editedTask.workingDays.length > 0 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Selected Working Days
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {editedTask.workingDays.map((day, index) => (
                  <Chip
                    key={index}
                    label={new Date(day).toLocaleDateString()}
                    onDelete={() => {
                      setEditedTask({
                        ...editedTask,
                        workingDays: editedTask.workingDays.filter((_, i) => i !== index)
                      });
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Notes
              </Typography>
              <Button
                startIcon={<AddIcon />}
                size="small"
                onClick={() => {
                  setEditedTask({
                    ...editedTask,
                    notes: [...editedTask.notes, {
                      id: crypto.randomUUID(),
                      title: '',
                      content: '',
                      createdAt: new Date(),
                      updatedAt: new Date()
                    }]
                  });
                }}
              >
                Add Note
              </Button>
            </Box>
            <Stack spacing={2}>
              {editedTask.notes.map((note, index) => (
                <Paper
                  key={note.id}
                  variant="outlined"
                  sx={{ p: 2 }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ flex: 1, mr: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(note.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => {
                        setEditedTask({
                          ...editedTask,
                          notes: editedTask.notes.filter(n => n.id !== note.id)
                        });
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    label="Note Title"
                    value={note.title}
                    onChange={(e) => {
                      const updatedNotes = [...editedTask.notes];
                      updatedNotes[index] = {
                        ...note,
                        title: e.target.value,
                        updatedAt: new Date()
                      };
                      setEditedTask({
                        ...editedTask,
                        notes: updatedNotes
                      });
                    }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Note Content"
                    value={note.content}
                    onChange={(e) => {
                      const updatedNotes = [...editedTask.notes];
                      updatedNotes[index] = {
                        ...note,
                        content: e.target.value,
                        updatedAt: new Date()
                      };
                      setEditedTask({
                        ...editedTask,
                        notes: updatedNotes
                      });
                    }}
                    placeholder="Enter note content..."
                  />
                </Paper>
              ))}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </DialogActions>
    </>
  );

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
                  {new Date(task.dueDates).toLocaleDateString()}
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
        onClose={() => {
          setIsDialogOpen(false);
          setIsEditMode(false);
          setEditedTask(task);
        }}
        maxWidth="md"
        fullWidth
      >
        {isEditMode ? renderEditMode() : renderViewMode()}
      </Dialog>
    </>
  );
};
