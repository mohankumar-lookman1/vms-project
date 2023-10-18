import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemIcon, Avatar, ListItemText } from '@mui/material';
import { Home, Inbox, Mail, LiveTv, ViewComfy, Timeline, MoreHoriz } from '@mui/icons-material';
import './Style.css';  
import { Link,Routes,Route } from 'react-router-dom';
import logo from '../assets/secura.png';
import Searchbar from '../Component/searchbox/Searchbar';
import Layout from '../Component/Layout/matrix';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const App = () => {
  const [userData, setUserData] = useState({ name: '', avatar: '' });
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div classname="container">
    <div className="app-container">
      {/* First Sidebar */}
      <div className="sidebar sidebar-light">
      <img src={logo} alt="Logo" style={{   width: '35px', height: '40px', marginTop: '10px',marginRight:"10px",marginBottom:"20px"}}/>
        <List>
          <ListItem>
            <ListItemIcon sx={{color:'white',marginLeft:"20px"}}>
              <Home />
            </ListItemIcon>
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{color:'white',marginLeft:"20px"}}>
              <Inbox />
            </ListItemIcon>
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{color:'white',marginLeft:"20px"}}>
              <Mail />
            </ListItemIcon>
          </ListItem>
        </List>
      </div>

      {/* Second Sidebar (conditionally rendered based on screen width) */}
      {windowWidth > 600 && (
        <div className="sidebar sidebar-dark">
          <div className="user-info">
            <div>{userData.name}</div>
            <Avatar src={userData.avatar} alt="User Avatar" className="avatar" />
          </div>
          <List>
            <ListItem>
              <ListItemIcon>
                <LiveTv sx={{color:'white'}}/>
              </ListItemIcon>
              <Link to="/live" >
              <ListItemText primary="Live" sx={{textDecoration:'none',color:"white"}}/>
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ViewComfy sx={{color:'white'}}/>
              </ListItemIcon>
              <Link to="/layout"  >
              <ListItemText primary="Layout" sx={{textDecoration:'none',color:"white"}}/>
             </Link>
            </ListItem>
          
            <ListItem>
              <ListItemIcon>
                <Timeline sx={{color:'white'}}/>
              </ListItemIcon>
              <Link to="/sequence" >
              <ListItemText primary="Sequence" sx={{textDecoration:'none',color:"white"}}/>
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MoreHoriz sx={{color:'white'}}/>
              </ListItemIcon>
              <Link to="/more" >
              <ListItemText primary="More" sx={{textDecoration:'none',color:"white"}}/>
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
        <Link to="/logout">
          <ListItemText primary="Logout" sx={{ textDecoration: 'none', color: 'white' }} />
        </Link>
      </ListItem>
      </div>
          </List>
        </div>
      )}

      <div className='content'>
        <Searchbar/>
        <Routes>
        <Route path="/live" element={<Layout />} />
      </Routes>
      </div>
    </div>
    </div>

  );
};

export default App;