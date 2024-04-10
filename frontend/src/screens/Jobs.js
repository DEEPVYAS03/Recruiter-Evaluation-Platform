import React from 'react'

import { useUser } from '../context/allContext';
import HomeNavbar from './../components/Navbar';
import CandidateCard from './../components/CandidateCard';

const Jobs = () => {
  const { name, setName } = useUser();
  return (
    <>
    <HomeNavbar props={"jobs"}/>
    <div className='mt-10 ml-24'>
      <div className='text-2xl font-semibold'>Available Jobs:</div>
      <div className='mt-4'>
      <CandidateCard/>
      </div>
    </div>
    </>
  )
}

export default Jobs
