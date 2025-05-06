import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, IconButton, Button,
  Drawer, List, ListItem, ListItemButton, ListItemText, Box, Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Exchange Rates (Live)', to: '/exchange-rates' },
  { label: 'Error Page', to: '/error' },
];

function NavigationBar({ mode, setMode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <AppBar position="static" sx={{ width: '100%' }}>
      <Container maxWidth={false} disableGutters>
        <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Loan Calculator
          </Typography>
          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 220 }} onClick={() => setDrawerOpen(false)}>
                  <List>
                    {navLinks.map((item) => (
                      <ListItem key={item.to} disablePadding>
                        <ListItemButton component={Link} to={item.to}>
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                    <ListItem disablePadding>
                      <ListItemButton onClick={toggleTheme}>
                        <ListItemText primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'} />
                        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navLinks.map((item) => (
                <Button key={item.to} color="inherit" component={Link} to={item.to}>
                  {item.label}
                </Button>
              ))}
              <IconButton sx={{ ml: 1 }} color="inherit" onClick={toggleTheme}>
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavigationBar;
