import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Logo2 from '../images/logo2.png';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { useUser } from '../context/allContext';
import DeepResume from '../uploads/Deep_Resume.pdf';

const CandidateCard = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [appliedJobs, setAppliedJobs] = useState(new Set());
    const [showModal, setShowModal] = useState(false);
    // const {email,setEmail} = useUser(); 

    useEffect(() => {
        getJobs();
    }, []);

    const getJobs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/getjobs');
            setJobs(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    const handleViewDetails = (job) => {
        setSelectedJob(job);
    }

    const handleCloseDetails = () => {
        setSelectedJob(null);
    }

    const trimFilePath = (filePath) => {
        const startIndex = filePath.lastIndexOf('uploads');
        const trimmedPath = filePath.substring(startIndex);
        return trimmedPath.replace(/\\/g, '/');
    }

    const handleApply =async (jobId) => {
        // Mark the job as applied
        
        console.log("Email:",localStorage.getItem('email'));
        const response = await axios.put('http://localhost:5000/api/applyjob', { jobId, email: localStorage.getItem('email')})
        const data = response.data;
        console.log(data);
        setAppliedJobs(new Set(appliedJobs).add(jobId));
        setShowModal(true);
        
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <div className='flex flex-row gap-3'>
            {jobs.map((job) => (
                <div key={job._id}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={Logo2} />
                        <Card.Body>
                            <Card.Title>{job.jobProfile}</Card.Title>
                            <Card.Text>
                                <div>
                                    <span className='font-semibold'>Company:</span> {job.company}
                                </div>
                                <div>
                                    <span className='font-semibold'>Salary:</span> {job.salary}
                                </div>
                                <div>
                                    <span className='font-semibold'>Deadline:</span> {formatDate(job.lastDate)}
                                </div>
                            </Card.Text>
                            <div className='flex flex-row justify-around'>
                                <a href={require(`../${trimFilePath(job.jdFile)}`)} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">View Details</a>
                                <Button
                                    variant="outline-success"
                                    onClick={() => handleApply(job._id)}
                                    disabled={appliedJobs.has(job._id)}
                                >
                                    {appliedJobs.has(job._id) ? "Applied" : "Apply"}
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            ))}

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Application Submitted</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your application for the selected job has been submitted successfully.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CandidateCard;
