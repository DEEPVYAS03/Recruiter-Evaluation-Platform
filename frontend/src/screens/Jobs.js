import React from 'react'
import JobCard from '../components/JobCard'
import { useUser } from '../context/allContext';

const Jobs = () => {
  const { name, setName } = useUser();
  return (
    <div className='m-10'>
      <div className='text-2xl font-semibold'>Available Jobs</div>
      <div className='mt-4'>
      <JobCard/>
      </div>
    </div>
  )
}

export default Jobs
