'use client'
import React, { useEffect, useState } from 'react';
import SideNav from '../../../components/SideNav';
import { useRouter } from 'next/navigation';
import MyAPI, { Item } from '../../../components/MyAPI';
import TopNavBar from '../../../components/TopNavBar';
import Welcome from '../../../components/Welcome';
import { ToastContainer, toast } from 'react-toastify';
import PendingTable from '../../../components/PendingTable';
import Footer from '../../../components/Footer';
import WelcomeUser from '../../../components/WelcomeUser';
import UploadFile from '../../../components/UploadProfile';

function Page() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('');
  const [pendingCount, setPendingCount] = useState('0');
  const [pendingData, setPendingData] = useState([]);
  const [completeCount, setCompleteCount] = useState('0');
  const [completeData, setCompleteData] = useState([]);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const username = Item.getItem('username');
    const userType = Item.getItem('userType');
    setUserType(userType);
    setUsername(username);
    if (userType === 'user') {
      setAdmin(false);
      MyAPI.post('/student_handler.php', { username })
        .then((res) => {
          if (res.data.status !== 200) {
            router.push('/sign-in');
            toast.error('Something went wrong...!', {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            });
          }
        });
    } else {
      setAdmin(true);
      // Check if the user is an admin
    }

  }, [username, userType]);

  useEffect(() => {
    const username = Item.getItem('username');
    const userType = Item.getItem('userType');
    const body = { username, userType };
    MyAPI.post('/complete-application.php', body)
      .then((res) => {
        if (res.data.status === 201) {
          setCompleteCount(res.data.record_count);
          setCompleteData(res.data.data);
        } else {
          console.log(res);
        }
      });
  }, [completeCount, completeData]);

  useEffect(() => {
    const username = Item.getItem('username');
    const userType = Item.getItem('userType');
    const body = { username, userType };
    MyAPI.post('/pending-application.php', body)
      .then((res) => {
        if (res.data.status === 201) {
          setPendingCount(res.data.record_count);
          setPendingData(res.data.data);
        } else {
          console.log(res);
        }
      });
  }, [pendingCount, pendingData]);

  return (
    <div className="dashboard">
      <SideNav />
      <div className="main-body">
        <div className="semi-body">
          <TopNavBar />
          {admin ?
            (
              <> 
              {/* this code shown as a admin */}
                <Welcome pending={pendingCount} complete={completeCount} />
                <PendingTable title="Pending Application" colorCode="yellow" data={pendingData} />
                <PendingTable title="Complete Application" colorCode="green" data={completeData} />
                <Footer />
              </>
            )
            : (
              <>
              {/* this code shown as a user */}
              <WelcomeUser/>
              <UploadFile/>
              </>
            )
          };

        </div>
      </div>
    </div>
  );
}

export default Page;
