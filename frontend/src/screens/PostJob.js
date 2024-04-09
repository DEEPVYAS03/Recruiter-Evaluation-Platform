import React from 'react';
import HomeNavbar from '../components/Navbar';
import JobCard from '../components/JobCard';

const PostJob = () => {
  return (
    <div className="relative">
      <HomeNavbar props={"post"}/>
      <div className="absolute top-0 right-0 mt-16 mr-8">
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Post a Job
        </button>
      </div>
      <div className='m-5 flex flex-row gap-3'>
        <JobCard/>
        </div>
    </div>
  );
}

export default PostJob;
