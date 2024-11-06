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

export const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState('');

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

        {/* Placeholder for tasks list */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: 200,
            backgroundColor: 'background.default',
            borderRadius: 2,
            p: 3
          }}
        >
          <Typography color="text.secondary">
            No tasks found. Create your first task!
          </Typography>
        </Box>
      </Paper>
    </DashboardLayout>
  );
};
