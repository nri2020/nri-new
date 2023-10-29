import React, { useEffect, useState } from 'react';
import './welcome.css';
import GroupIcon from '@mui/icons-material/Group';
import InfoIcon from '@mui/icons-material/Info';
import SpaIcon from '@mui/icons-material/Spa';

function Welcome(props) {
  const { pending, complete } = props;

  return (
    <React.StrictMode>
      <div className="welcome-box">
        <h1>Welcome To Dashboard</h1>
        <span className="url">Home / Dashboard</span>
        <div className="card-welcome">
          <div className="card user">
            <div className="inner-card">
              <div className="icon">
                <GroupIcon sx={33} style={{ color: 'white' }} />
              </div>
              <div className="count">
                <b>764</b>
              </div>
              <span className="title">Students</span>
            </div>
          </div>
          <div className="card pending">
            <div className="inner-card">
              <div className="icon">
                <InfoIcon sx={33} style={{ color: 'yellow' }} />
              </div>
              <div className="count">
                <b>{pending !== null ? pending : 'loading...'}</b>
              </div>
              <span className="title">Pending Application</span>
            </div>
          </div>
          <div className="card complete">
            <div className="inner-card">
              <div className="icon">
                <SpaIcon sx={33} style={{ color: 'greenyellow' }} />
              </div>
              <div className="count">
                <b>{complete !== null ? complete : 'loading...'}</b>
              </div>
              <span className="title">Completed Application</span>
            </div>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
}

export default Welcome;
