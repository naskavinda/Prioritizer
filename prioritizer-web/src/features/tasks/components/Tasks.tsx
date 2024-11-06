import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import { 
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon 
} from '@mui/icons-material';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay,
  DragStartEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { 
  arrayMove,
} from '@dnd-kit/sortable';
import { TaskSection } from './TaskSection';
import { TaskItem } from './TaskItem';

interface Task {
  id: string;
  title: string;
}

interface TaskSection {
  id: string;
  title: string;
  tasks: Task[];
}

export const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [sections, setSections] = useState<TaskSection[]>([
    {
      id: 'today',
      title: "Today's Tasks",
      tasks: [
        { id: 'task-1', title: 'Task 1' },
        { id: 'task-2', title: 'Task 2' },
        { id: 'task-3', title: 'Task 3' },
      ],
    },
    {
      id: 'tomorrow',
      title: 'Tomorrow Tasks',
      tasks: [
        { id: 'task-4', title: 'Task 4' },
        { id: 'task-5', title: 'Task 5' },
        { id: 'task-6', title: 'Task 6' },
      ],
    },
    {
      id: 'todo',
      title: 'TODO Tasks',
      tasks: [
        { id: 'task-7', title: 'Task 7' },
        { id: 'task-8', title: 'Task 8' },
        { id: 'task-9', title: 'Task 9' },
        { id: 'task-9', title: 'Task 10' },
      ],
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeSection = sections.find(section =>
      section.tasks.some(task => task.id === active.id)
    );
    const task = activeSection?.tasks.find(task => task.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeSection = sections.find(section =>
      section.tasks.some(task => task.id === activeId)
    );
    const overSection = sections.find(section =>
      section.id === overId || section.tasks.some(task => task.id === overId)
    );

    if (!activeSection || !overSection) return;

    const newSections = [...sections];
    const activeSectionIndex = sections.indexOf(activeSection);
    const overSectionIndex = sections.indexOf(overSection);

    if (activeSection === overSection) {
      // Reordering within the same section
      const activeTaskIndex = activeSection.tasks.findIndex(task => task.id === activeId);
      const overTaskIndex = activeSection.tasks.findIndex(task => task.id === overId);
      
      newSections[activeSectionIndex].tasks = arrayMove(
        activeSection.tasks,
        activeTaskIndex,
        overTaskIndex
      );
    } else {
      // Moving to a different section
      const task = activeSection.tasks.find(task => task.id === activeId)!;
      newSections[activeSectionIndex].tasks = activeSection.tasks.filter(
        task => task.id !== activeId
      );
      
      if (overId === overSection.id) {
        // Dropped directly on the section
        newSections[overSectionIndex].tasks.push(task);
      } else {
        // Dropped on a task in the section
        const overTaskIndex = overSection.tasks.findIndex(task => task.id === overId);
        newSections[overSectionIndex].tasks.splice(overTaskIndex, 0, task);
      }
    }

    setSections(newSections);
    setActiveTask(null);
  };

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              Tasks
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Add New Task
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'background.default',
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton 
              sx={{ 
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: 1
              }}
            >
              <FilterIcon />
            </IconButton>
          </Grid>
        </Grid>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {sections.map((section) => (
            <TaskSection
              key={section.id}
              id={section.id}
              title={section.title}
              tasks={section.tasks}
            />
          ))}
          <DragOverlay>
            {activeTask ? <TaskItem id={activeTask.id} title={activeTask.title} /> : null}
          </DragOverlay>
        </DndContext>
      </Paper>
    </DashboardLayout>
  );
};
