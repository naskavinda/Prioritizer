import { useState } from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  IconButton,
  Avatar,
  Typography
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Build as ToolsIcon,
  Description as TemplatesIcon,
  Assignment as ProjectsIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const drawerWidth = 240;

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Tasks', icon: <PersonIcon />, path: '/tasks' },
    { text: 'Tools', icon: <ToolsIcon />, path: '/tools' },
    { text: 'Templates', icon: <TemplatesIcon />, path: '/templates' },
    { text: 'Projects', icon: <ProjectsIcon />, path: '/projects' },
  ];

  const bottomMenuItems = [
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { text: 'Help', icon: <HelpIcon />, path: '/help' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 72,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 72,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease-in-out',
          overflowX: 'hidden',
          background: 'linear-gradient(180deg, #f8faff 0%, #f0f4ff 100%)',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          minHeight: 64,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {open && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
            <Avatar 
              src={user?.photoURL || undefined}
              alt={user?.displayName || 'User'}
              sx={{
                width: 40,
                height: 40,
                bgcolor: 'primary.main',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            >
              {!user?.photoURL && (user?.displayName?.[0] || 'U')}
            </Avatar>
            <Typography 
              variant="subtitle1" 
              noWrap
              sx={{ 
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              {user?.displayName || user?.email || 'User'}
            </Typography>
          </Box>
        )}
        <IconButton 
          onClick={toggleDrawer}
          sx={{
            backgroundColor: 'background.default',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
            transition: 'all 0.2s',
          }}
        >
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      {/* Main Menu Items */}
      <List sx={{ 
        flex: 1, 
        pt: 2,
        '& .MuiListItemButton-root': {
          background: 'rgba(255, 255, 255, 0.5)',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.9)',
          }
        }
      }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 48,
                px: 2.5,
                mx: 1,
                borderRadius: 1.5,
                justifyContent: open ? 'initial' : 'center',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
                transition: 'all 0.2s',
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: 0, 
                  mr: open ? 2 : 'auto', 
                  justifyContent: 'center',
                  color: 'text.secondary',
                  transition: 'color 0.2s',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  opacity: open ? 1 : 0,
                  '& .MuiTypography-root': {
                    fontWeight: 500,
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Bottom Menu Items */}
      <List sx={{ 
        borderTop: '1px solid rgba(0, 0, 0, 0.08)', 
        pt: 2, 
        pb: 2,
        background: 'rgba(255, 255, 255, 0.5)',
        '& .MuiListItemButton-root': {
          background: 'rgba(255, 255, 255, 0.5)',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.9)',
          }
        }
      }}>
        {bottomMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 48,
                px: 2.5,
                mx: 1,
                borderRadius: 1.5,
                justifyContent: open ? 'initial' : 'center',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
                transition: 'all 0.2s',
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: 0, 
                  mr: open ? 2 : 'auto', 
                  justifyContent: 'center',
                  color: 'text.secondary',
                  transition: 'color 0.2s',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  opacity: open ? 1 : 0,
                  '& .MuiTypography-root': {
                    fontWeight: 500,
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              minHeight: 48,
              px: 2.5,
              mx: 1,
              borderRadius: 1.5,
              justifyContent: open ? 'initial' : 'center',
              background: 'rgba(255, 255, 255, 0.5)',
              '&:hover': {
                background: 'rgba(255, 82, 82, 0.1)',
                '& .MuiListItemIcon-root': {
                  color: 'error.main',
                },
                '& .MuiListItemText-primary': {
                  color: 'error.main',
                },
              },
              transition: 'all 0.2s',
            }}
          >
            <ListItemIcon 
              sx={{ 
                minWidth: 0, 
                mr: open ? 2 : 'auto', 
                justifyContent: 'center',
                color: 'text.secondary',
                transition: 'color 0.2s',
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              sx={{ 
                opacity: open ? 1 : 0,
                '& .MuiTypography-root': {
                  fontWeight: 500,
                }
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
