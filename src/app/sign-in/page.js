'use client'
import React, { useState, useEffect } from 'react'
import '../sign-up/Login.css'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MyAPI, { Item } from '../../../components/MyAPI.jsx';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function page() {
    let router = useRouter();

    useEffect(()=>{
        let username = Item.getItem('username');
        let userType = Item.getItem('userType');
        if(username !== '' && userType !== ''){
            router.push('/dashboard');
        }
    },[])

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const LoginHandler = (e) => {
        e.preventDefault();

        if (!username || !password) {
            toast.error('All fields are required', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        const data = { username, password };

        if (role == 'user') {
            try {
                MyAPI.post('/student_login.php', data)
                .then((res) => {
                    console.log(res);
                    if (res.data.status == 200) {
                        Item.setItem('username', res.data.result.username);
                        Item.setItem('userType', role);
                        router.push('/dashboard');
                        toast.success(res.data.message, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }else if(res.data.status == 401){
                        toast.error(res.data.message, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            });
                    }else{
                        toast.error(res.error, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            });
                    }
                })
            } catch (error) {
                toast.error(error.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
        } else {
            try {
                MyAPI.post('/admin_login.php', data)
                .then((res) => {
                    console.log(res)
                    Item.setItem('username', res.data.user.username);
                    Item.setItem('userType', role);
                    router.push('/dashboard');
                    toast.success(res.data.msg, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    
                })
            } catch (error) {
                toast.error(error.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
        }
    }


    return (
        <React.StrictMode>
            <div className="Log-in-container">
                <div className="inner-div">
                    <div className="left-l">
                        <div className="logo">
                            <img src={'/images/logo-dark.png'} alt="" />
                        </div>
                        <div className="left-center-l">
                            <div className="l-inner-box">
                                <div className="center-box">
                                    <div className="input in">
                                        <span>nri@gmail.com</span>
                                    </div>
                                    <div className="input in">0 _ _ _ _ _ _</div>
                                    <div className="input btn">LOGIN</div>
                                </div>
                                <div className="right-top-up">
                                    <div className="img">
                                        <img src={'/images/UserImg.png'} alt="" />
                                    </div>
                                    <div className="name">
                                        <span className="username">Sandeep KR.</span>
                                        <br />
                                        <span className="useremail">nri@gmail.com</span>
                                    </div>
                                </div>
                                <div className="left-top-up">
                                    <div className="icon">
                                        <CloudDownloadIcon sx={{ height: 40, color: 'black', padding: 20 }} />
                                    </div>
                                    <div className="box">
                                        <div className="line"></div>
                                        <span className="code">Your Login Code is U2*&</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bottom-cercle">
                            <div className="text">
                                Power Pation ,
                                <br />
                                Trusted Solution
                            </div>
                        </div>
                    </div>
                    <div className="right-l">
                        <div className="heder-log">
                            <h2>LOGIN</h2>
                        </div>
                        <div className="log-in-box">
                            <div className="input">
                                <input name='username' value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder='nri@gmil.com' />
                            </div>
                            <div className="input">
                                <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder='********' />
                            </div>
                            <div className="input">
                                <select value={role} onChange={handleChange} style={{
                                    width: '100%',
                                    height: '100%',
                                    background: 'transparent',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}>
                                    <option value="user" style={{ backgroundColor: '#d7d7ff', cursor: 'pointer' }}>User</option>
                                    <option value="admin" style={{ backgroundColor: '#d7d7ff', cursor: 'pointer' }}>Admin</option>
                                </select>
                            </div>
                            <div className="text-m">
                                <span>Don't have account? <span className='forget-password'><Link href={'/sign-up'}>SIGN UP</Link></span> </span>
                                <span className='forget-password'><Link href={'/forget-password'}>Forgot Password ?</Link></span>
                            </div>
                            <div className="my-btn" onClick={LoginHandler} style={{ cursor: 'pointer' }}> LOG-IN </div>
                            <div className="text-bottom">
                                <span className="info">If you'r having trouble please contact</span>
                                <br />
                                <a href="mailto:nrigroup@gmail.com" target="_blank" rel="noopener noreferrer">nrigroup@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.StrictMode>
    )
}

export default page
