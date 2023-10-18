import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';

import './SearchBox.css'; // Import the CSS file

const SearchBox = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [showNotificationBox, setShowNotificationBox] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleNotificationIconClick = () => {
    setShowNotificationBox(!showNotificationBox);
  };

  return (
    <div>
      <Toolbar>
        <div className="toolbar">
          <div style={{ marginLeft: 'auto' }}>
            <InputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              fullWidth
              className="inputBase"
              style={{
                transform: `scaleX(${searchVisible ? 1 : 0})`,
                visibility: searchVisible ? 'visible' : 'hidden',
                width: searchVisible ? '17vw' : '0',
                paddingLeft: searchVisible ? '5px' : '0',
              }}
            />
          </div>
          <div style={{ marginLeft: '10px' }}>
            <IconButton onClick={toggleSearch} className="searchIcon">
              <SearchIcon sx={{color:"white"}}/>
            </IconButton>
          </div>
          <div style={{ margin: '0 15px', position: 'relative' }}>
            <IconButton onClick={toggleNotificationIconClick} className="notificationIcon">
              {showNotificationBox ? <MessageIcon  sx={{color:"white"}}/> : <NotificationsIcon  sx={{color:"white"}} />}
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </div>
  );
};

export default SearchBox;
