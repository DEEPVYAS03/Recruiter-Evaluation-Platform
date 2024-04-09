import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../screens/Login';
import Upload from '../screens/Upload';
import Jobs from '../screens/Jobs';
import Hr from '../screens/Hr';
import HrHome from '../screens/HrHome';
import PostJob from '../screens/PostJob';


const Navigation = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/hr" element={<Hr/>} />
                <Route path="/hr/home" element={<HrHome/>} />
                <Route path="/hr/post" element={<PostJob/>} />

            </Routes>
        </Router>
    );
};

export default Navigation;
