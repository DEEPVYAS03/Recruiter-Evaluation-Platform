import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../screens/Login';
import Upload from '../screens/Upload';
import Jobs from '../screens/Jobs';

const Navigation = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/jobs" element={<Jobs />} />
            </Routes>
        </Router>
    );
};

export default Navigation;
