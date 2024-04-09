import React from 'react';
import joblogo from '../images/joblogo.png';
import HomeNavbar from '../components/Navbar';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { useUser } from '../context/allContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {name,setName} = useUser();
  const {email,setEmail} = useUser();
  const navigate = useNavigate();
  return (
    <>
      <HomeNavbar props={"login"} />
      <div>
        <div className='mt-2 flex flex-col items-center'>
          <div className='m-5 font-bold text-6xl'>Resume Ranking System</div>
          <div className='m-3'>
            <GoogleLogin
              onSuccess={credentialResponse => {
                const decoded = jwtDecode(credentialResponse?.credential);
                setName(decoded.name);
                setEmail(decoded.email);
                localStorage.setItem('username',decoded.name);
                localStorage.setItem('email',decoded.email);
                navigate('/upload');
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />

          </div>
          <div className='mt-10'>
            <img src={joblogo} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
