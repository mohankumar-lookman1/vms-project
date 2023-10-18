import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import customSearchIcon from '../../assets/Search.png';
import customNotificationsIcon from '../../assets/Group.png';
import customNotificationsIconWithMessage from '../../assets/Message.png';
import './SearchBox.css'; // Import the CSS file

const SearchBox = () => {
  const [notificationIcon, setNotificationIcon] = useState(customNotificationsIcon);
  const [searchVisible, setSearchVisible] = useState(false);
  const [showNotificationBox, setShowNotificationBox] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleNotificationIconClick = () => {
    if (notificationIcon === customNotificationsIcon) {
      setNotificationIcon(customNotificationsIconWithMessage);
    } else if (notificationIcon === customNotificationsIconWithMessage) {
      setShowNotificationBox(true);
    }
  };

  const closeNotificationBox = () => {
    setNotificationIcon(customNotificationsIcon);
    setShowNotificationBox(false);
  };

  return (
    <div>
      <Toolbar>
        <div className="toolbar"> {/* Apply CSS class */}
          <div style={{ marginLeft: 'auto' }}>
            <InputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              fullWidth
              className="inputBase" // Apply CSS class
              style={{
                transform: `scaleX(${searchVisible ? 1 : 0})`,
                visibility: searchVisible ? 'visible' : 'hidden',
                width: searchVisible ? '100%' : '0',
                paddingLeft: searchVisible ? '10px' : '0',
              }}
            />
          </div>
          <div style={{ marginLeft: '30px' }}>
            <img
              src={customSearchIcon}
              alt="Search"
              onClick={toggleSearch}
              className="searchIcon" // Apply CSS class
            />
          </div>
          <div style={{ margin: '0 15px', position: 'relative' }}>
            <img
              src={notificationIcon}
              alt="Notifications"
              onClick={
                notificationIcon === customNotificationsIconWithMessage
                  ? closeNotificationBox
                  : toggleNotificationIconClick
              }
              className="notificationIcon" // Apply CSS class
            />
          </div>
        </div>
      </Toolbar>
    </div>
  );
};

export default SearchBox;
