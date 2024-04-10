import React, { useState } from 'react';
import HomeNavbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const PostJob = () => {
  const [showModal, setShowModal] = useState(false);
  const [company, setCompany] = useState('');
  const [jobProfile, setJobProfile] = useState('');
  const [salary, setSalary] = useState('');
  const [lastDate, setLastDate] = useState('');
  const [jdFile, setJdFile] = useState(null);

  const handleFileChange = (e) => {
    setJdFile(e.target.files[0]);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = {
      company,
      jobProfile,
      salary,
      lastDate,
      jdFile,
    };
    
    console.log(formData);

    const response=await axios.post('http://localhost:5000/api/jobpost',formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    const data = response.data; 
    console.log(data);


    setCompany('');
    setJobProfile('');
    setSalary('');
    setLastDate('');
    setJdFile(null);
    setShowModal(false);
  };

  return (
    <div className="relative">
      <HomeNavbar props={"post"} />
      <div className="absolute top-0 right-0 mt-16 mr-8">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowModal(true)}
        >
          Post a Job
        </button>
      </div>
      <div className='m-5 flex flex-row gap-3'>
        <JobCard />
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form action='/api/jobpost' method='POST' encType='multipart/form-data' onSubmit={handleSubmit}>
            <Form.Group controlId="company">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="jobProfile">
              <Form.Label>Job Profile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job profile"
                value={jobProfile}
                onChange={(e) => setJobProfile(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="salary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="lastDate">
              <Form.Label>Last Date</Form.Label>
              <Form.Control
                type="date"
                value={lastDate}
                onChange={(e) => setLastDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="jdFile">
              <Form.Label>Upload JD File</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
              />
            </Form.Group>

            <button
              className="block mx-auto mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowModal(true)}
            >
             Submit
            </button>

          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PostJob;
