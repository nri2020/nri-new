import React from 'react'
import './user.css';
import Image from 'next/image';
function WelcomeUser() {
  return (
    <React.StrictMode>
      <div className="welcome-boxx">
        <div className="msg">
            <div className="title">Welcome User</div>
            <div className="doc">
            Welcome, valued user, to our platform. Explore and enjoy the convenience of our services and resources. Thank you for joining
            </div>
        </div>
        <div className="img">
            <Image src={'/images/user-welcome.png'} width={200} height={200} />
        </div>
      </div>
    </React.StrictMode>
  )
}

export default WelcomeUser
