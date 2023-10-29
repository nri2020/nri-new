'use client'
import './Login.css'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MyAPI, { Item } from '../../../components/MyAPI.jsx';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

function page() {
    let navigater = useRouter();
    useEffect(()=>{
        let username = Item.getItem('username');
        let userType = Item.getItem('userType');
        if(username !== '' && userType !== ''){
            navigater.push('/dashboard');
        }
    },[])
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setC_Password] = useState('');

    const formHandling = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !c_password) {
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

        if (password !== c_password) {
            toast.warn('Password and Confirm Password must be the same', {
                position: "top-center",
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

        MyAPI.post('/student_register.php', { name, email, password, username, c_password })
            .then((userData) => {
                console.log(userData)
                if (userData.data.status === 201) {
                    Item.setItem('username', username);
                    Item.setItem('userType', 'user');
                    navigater.push('/dashboard');
                    toast.success(userData.data.msg, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    toast.error(userData.data.msg, {
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
    }
    return (
        <React.StrictMode>
            <div className="Log-in-container">
                <div className="inner-div">
                    <div className="left-l">
                        <div className="logo">
                            <img src={'images/logo-dark.png'} alt="" />
                        </div>
                        <div className="left-center-l">
                            <div className="l-inner-box">
                                <div className="center-box">
                                    <div className="input in">
                                        <span>employee@gmail.com</span>
                                    </div>
                                    <div className="input in">0 _ _ _ _ _ _</div>
                                    <div className="input btn">REGISTER</div>
                                </div>
                                <div className="right-top-up">
                                    <div className="img">
                                        <img src={'images/UserImg.png'} alt="" />
                                    </div>
                                    <div className="name">
                                        <span className="username">Sandeep KR.</span>
                                        <br />
                                        <span className="useremail">employee@gmail.com</span>
                                    </div>
                                </div>
                                <div className="left-top-up">
                                    <div className="icon">
                                        <CloudDownloadIcon sx={{ height: 40, color: 'black', padding: 20 }} />
                                    </div>
                                    <div className="box">
                                        <div className="line"></div>
                                        <span className="code">Your VERI. Code is U2*&</span>
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
                        <div className="heder-log register">
                            <h2>REGISTER</h2>
                        </div>
                        <div className="log-in-box register">
                            <div className="input">
                                <input name='username' onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder='username' />
                            </div>
                            <div className="input">
                                <input name='name' onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Full Name' />
                            </div>
                            <div className="input">
                                <input name='email' onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder='employee@gmil.com' />
                            </div>
                            <div className="input">
                                <input name='password' onChange={(e) => setPassword(e.target.value)} value={password} type="text" placeholder='password' />
                            </div>
                            <div className="input">
                                <input name='c_password' onChange={(e) => setC_Password(e.target.value)} value={c_password} type="text" placeholder='confirm password' />
                            </div>
                            <div className="text-m">
                                <span>Already have account? <span className='forget-password' ><Link href={'/sign-in'} >SIGN IN</Link></span> </span>
                            </div>
                            <div className="my-btn" onClick={formHandling} style={{ cursor: 'pointer' }}> REGISTER </div>
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
