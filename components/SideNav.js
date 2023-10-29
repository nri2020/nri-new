'use client'
import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SpaIcon from '@mui/icons-material/Spa';
import Link from 'next/link';
import TableViewIcon from '@mui/icons-material/TableView';
import MyAPI, { Item } from './MyAPI';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import PersonIcon from '@mui/icons-material/Person';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import AirplayIcon from '@mui/icons-material/Airplay';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

function SideNav(props) {
  const [isAdmin,setisAdmin] = useState(false)
  const [per,setPer] = useState(null);
  useEffect(()=>{
    let userType = Item.getItem('userType');
    if(userType == 'admin'){
      setisAdmin(true);
    }else{
      setisAdmin(false);
    }
  },[isAdmin]);

  useEffect(()=>{
    let username = Item.getItem('username');
    if(username !== '' && username !== 'admin'){
      MyAPI.post('/check-eligiblity.php',{username})
      .then((res)=>{
        console.log(res.data);
        if(res.data.status == 200){
          setPer(res.data.percentage);
        }else{
          console.log('API ERROR IN SIDE NAV COMPONENT');
        }
      })
    }
  },[per])

  let menuItems;

  if(isAdmin){
    menuItems = [
      {
        path: '/dashboard',
        icon: <HomeIcon sx={{ fontSize: 26, color: 'white' }} />,
        name: 'Dashboard',
      },
      {
        path: '/dashboard/allow-form',
        icon: <TableViewIcon sx={{ fontSize: 26, color: 'white' }} />,
        name: 'Allow Student',
      },
      {
        path: '/dashboard/find_student',
        icon: <SpaIcon sx={{ fontSize: 26, color: 'white' }} />,
        name: 'Find Student',
      },
      {
        path: '/dashboard/take-attandance',
        icon: <PersonIcon sx={{ fontSize: 26, color: 'white' }} />,
        name: 'Take Attandance',
      },
      {
        path: '/dashboard/view-attandance',
        icon: <RecentActorsIcon sx={{ fontSize: 26, color: 'white' }} />,
        name: 'View Attandance',
      },
      {
        path: '/dashboard/view-feed',
        icon: <DynamicFeedIcon sx={{ fontSize: 26, color: 'white' }} />,
        name: 'View Feed-Back',
      },
      {
        path: '/dashboard/profile',
        icon: <AccountCircleIcon sx={{ fontSize: 26, color: 'white' }} />,
        name: 'Profile',
      },
      {
        path: '/dashboard/support',
        icon: <HelpIcon sx={{ fontSize: 26, color: 'white' }} />,
        name: 'Support',
      },
    ];
  }else{
    menuItems = [
      {
        path: '/dashboard',
        icon: <HomeIcon sx={{ fontSize: 26, color: 'white' }} />,
        name: 'Dashboard',
      },
      {
        path: '/dashboard/fill-form',
        icon: <TableViewIcon sx={{ fontSize: 26, color: 'white' }} />,
        name: 'Fill Form',
      },
      {
        path: '/dashboard/recept-download',
        icon: <CloudDownloadIcon sx={{ fontSize: 26, color: 'white' }} />,
        name: 'Recept. Download',
      },
      {
        path: '/dashboard/attandance',
        icon: <AirplayIcon sx={{ fontSize: 26, color: 'white' }} />,
        name: 'Attandance',
      },
      {
        path: '/dashboard/profile',
        icon: <AccountCircleIcon sx={{ fontSize: 26, color: 'white' }} />,
        name: 'Profile',
      },
      {
        path: '/dashboard/support',
        icon: <HelpIcon sx={{ fontSize: 26, color: 'white' }} />,
        name: 'Support',
      },
    ];

    if(per >= 75){
      menuItems.push({
        path: '/dashboard/feed-back',
        icon: <DynamicFeedIcon sx={{ fontSize: 26, color: 'white' }} />,
        name: 'Feed-Back',
      })
    }

  }


  return (
    <div className="side-nav">
      <h4 style={{color:'yellowgreen'}}>
        NRI <span>( BHOPAL )</span>
      </h4>
      <div className="items">
        {menuItems.map((item, index) => (
          <div className="item" key={index}>
            <Link href={item.path}>
              {item.icon} <span>{item.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
