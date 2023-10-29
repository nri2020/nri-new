import React from 'react'
import './TopBar.css'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SettingsIcon from '@mui/icons-material/Settings';

function TopNavBar() {
  return (
    <React.StrictMode>
      <div className="top-bar">
        <div className="input">
          <div className="input-box">
            <input type="text" placeholder='Search here...' />
          </div>
          <div className="btn-box"><SearchIcon sx={20} style={{ color: 'white' }} /></div>
        </div>
        <div className="actions">

          <div className="icon">
            <NotificationsIcon sx={20} style={{ color: "white" }} />
          </div>
          <div className="icon">
            <ChatBubbleIcon sx={20} style={{ color: "white" }} />
          </div>
          <div className="icon setting">
            <SettingsIcon sx={30} style={{ color: "white" }} />
          </div>

        </div>
      </div>
    </React.StrictMode>
  )
}

export default TopNavBar
