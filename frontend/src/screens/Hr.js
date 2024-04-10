import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';

const Hr = () => {
    const [adminId, setAdminId] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setAdminId(event.target.value);
    };

    const handleSubmit = () => {
        if (adminId === '777' || adminId === '888' || adminId === '999') {
            navigate('/hr/post');
        }
    };

    return (
        <div className="flex flex-col items-center mt-20"> 
            <div className="text-lg mb-3">Enter the admin Id</div> 
            <input
                type="number"
                className="px-3 py-2 border rounded-lg mb-3"
                value={adminId}
                onChange={handleChange} // Add onChange handler
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={handleSubmit}>Submit</button> 
        </div>
    );
};

export default Hr;
