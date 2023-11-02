import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemIcon, Avatar, ListItemText, Box } from '@mui/material';
import { Home, Inbox, Mail, LiveTv, ViewComfy, Timeline, MoreHoriz } from '@mui/icons-material';
import './Style.css';
import { Link, Routes, Route } from 'react-router-dom';
import logo from '../../assets/secura.png';
import Searchbar from '../../Component/searchbox/Searchbar';
import Layout from '../../Component/Live/finallive';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VideoStableIcon from '@mui/icons-material/VideoStable';
import Record from '../../Component/Recording/record';

const App = ({ response }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Extract the first letter of the username
  const firstLetter = response.username ? response.username.charAt(0) : '';


  return (
    <div className="full-container">
      <div className="app-container">
        {/* First Sidebar */}
        <div className="sidebar sidebar-light">
          <img src={logo} alt="Logo" style={{ width: '35px', height: '40px', marginTop: '10px', marginRight: '10px', marginBottom: '20px' }} />
          <List>
            <ListItem>
              <ListItemIcon sx={{ color: 'white', marginLeft: '20px' }}>
                <Home />
              </ListItemIcon>
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ color: 'white', marginLeft: '20px' }}>
                <Inbox />
              </ListItemIcon>
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ color: 'white', marginLeft: '20px' }}>
                <Mail />
              </ListItemIcon>
            </ListItem>
          </List>
        </div>

        {/* Second Sidebar (conditionally rendered based on screen width) */}
        {windowWidth > 600 && (
          <div className="sidebar sidebar-dark">
            <div className="user-info">
              <Box display="flex" alignItems="center">
                
                {response.username && <p style={{ marginLeft: '10px', color: 'white' }}>{response.username}</p>}
                <Avatar sx={{ color:"black" }} className="avatar">
                {firstLetter.toUpperCase()}
                </Avatar>
              </Box>
            </div>
            <List>
              <ListItem>
                <ListItemIcon>
                  <LiveTv sx={{ color: 'white' }} />
                </ListItemIcon>
                <Link to="/live">
                  <ListItemText primary="Live" sx={{ textDecoration: 'none', color: 'white' }} />
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ViewComfy sx={{ color: 'white' }} />
                </ListItemIcon>
                <Link to="/layout">
                  <ListItemText primary="Layout" sx={{ textDecoration: 'none', color: 'white' }} />
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <VideoStableIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <Link to="/recording">
                  <ListItemText primary="Recording" sx={{ textDecoration: 'none', color: 'white' }} />
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Timeline sx={{ color: 'white' }} />
                </ListItemIcon>
                <Link to="/sequence">
                  <ListItemText primary="Sequence" sx={{ textDecoration: 'none', color: 'white' }} />
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MoreHoriz sx={{ color: 'white' }} />
                </ListItemIcon>
                <Link to="/more">
                  <ListItemText primary="More" sx={{ textDecoration: 'none', color: 'white' }} />
                </Link>
              </ListItem>
              <div>
                <ListItem>
                  <ListItemIcon>
                    <SettingsIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <Link to="/settings">
                    <ListItemText primary="Settings" sx={{ textDecoration: 'none', color: 'white' }} />
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ExitToAppIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <Link to="/login">
                    <ListItemText primary="Logout" sx={{ textDecoration: 'none', color: 'white' }} />
                  </Link>
                </ListItem>
              </div>
            </List>
          </div>
        )}

        <div className='content'>
          <Searchbar />
          <Routes>
            <Route path="/live" element={<Layout />} />
            <Route path="/recording" element={<Record />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
