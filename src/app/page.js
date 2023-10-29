'use client'
import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import axios from 'axios';
import { useRouter } from 'next/navigation';

function page() {
  let rout = useRouter();
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  useEffect(()=>{
    rout.push('/sign-in');
  },[])

  const logInHandler = async (e) =>{
    e.preventDefault();
    const data = {username,password};
    let response =  await axios.post('https://dummyjson.com/auth/login',data);
    console.log(response.data.token)
    if(response.data.token){
      rout.push('/dashboard');
    }
  }

  return (
    <div className='main' style={{width:'100%',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0E0E23'}}>
      <h3 style={{color:'aliceblue'}}><center>Loading.....</center></h3>
    </div>
  )
}

export default page
