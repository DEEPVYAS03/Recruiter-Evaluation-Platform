import React, { useEffect, useState } from 'react';
import { Modal, Button, Table, Card } from 'react-bootstrap';
import axios from 'axios';
import Logo2 from '../images/logo2.png';

const JobCard = () => {
    const [jobs, setJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [appliedCandidates, setAppliedCandidates] = useState([]);
    const [showDetailedModal, setShowDetailedModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    useEffect(() => {
        getJobs();
    }, []);

    const getJobs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/getjobs');
            const data = response.data;
            setJobs(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const handleShowModal = async (job) => {
        setSelectedJob(job);
        setShowModal(true);
        console.log(job._id);
        const response = await axios.get(`http://localhost:5000/api/getappliedcandidates/${job._id}`);
        const data = response.data;
        console.log(data);
        setAppliedCandidates(data);
    };

    const handleDetailedAnalysis = async (candidate) => {
        try {
            setSelectedCandidate(candidate);
            setShowDetailedModal(true);
            const { jobProfile } = selectedJob;
            let rankKey, matchKey, unmatchKey;

            if (jobProfile === "Full Stack Developer") {
                rankKey = 'rank1';
                matchKey = 'match1';
                unmatchKey = 'unmatch1';
            } else {
                rankKey = 'rank2';
                matchKey = 'match2';
                unmatchKey = 'unmatch2';
            }

            const updatedCandidate = {
                ...candidate,
                rank: candidate[rankKey],
                match: candidate[matchKey],
                unmatch: candidate[unmatchKey]
            };

            setSelectedCandidate(updatedCandidate);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="flex flex-row gap-3">
            {jobs.map((job, index) => (
                <div key={index}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={Logo2} />
                        <Card.Body>
                            <Card.Title>{job.jobProfile}</Card.Title>
                            <Card.Text>
                                <div>
                                    <span className="font-semibold">Company:</span> {job.company}
                                </div>
                                <div>
                                    <span className="font-semibold">Salary:</span> {job.salary}
                                </div>
                                <div>
                                    <span className="font-semibold">Deadline:</span> {formatDate(job.lastDate)}
                                </div>
                            </Card.Text>
                            <div className="flex flex-row justify-around">
                                <Button variant="outline-success" onClick={() => handleShowModal(job)}>View Applied Candidates</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            ))}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Applied candidates</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>View Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appliedCandidates.map((candidate, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{candidate.username}</td>
                                    <td>{candidate.email}</td>
                                    <td>
                                        <Button variant="secondary" onClick={() => handleDetailedAnalysis(candidate)}>View</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDetailedModal} onHide={() => setShowDetailedModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Detailed Analysis</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCandidate && (
                        <div>
                            <div>
                                <span className="font-semibold">Candidate name:</span> {selectedCandidate.username}
                            </div>
                            <div>
                                <span className="font-semibold">Candidate Phone no:</span> {selectedCandidate.phone}
                            </div>
                            <div>
                                <span className="font-semibold">Email:</span> {selectedCandidate.email}
                            </div>
                            <div className='mt-2 text-xl font-semibold'>
                                Skills:
                            </div>
                            <div className='mt-2 flex flex-row gap-3 overflow-x-scroll items-center' style={{ scrollbarWidth: 1 }}>
                                {/* Display the skills */}
                                {selectedCandidate.skills.map((skill, index) => (
                                    <span key={index} className='bg-blue-600 text-white px-4 py-2 rounded-full text-center' style={{ whiteSpace: 'nowrap' }}>{skill}</span>
                                ))}
                            </div>
                            <div className='mt-2 text-xl font-semibold'>
                                Matched Skills:
                            </div>
                            <div className='mt-2 flex flex-row gap-3 overflow-x-scroll items-center' style={{ scrollbarWidth: 1 }}>
                                {/* Display the matched skills */}
                                {selectedCandidate.match.map((matchedSkill, index) => (
                                    <span key={index} className='bg-green-600 text-white px-4 py-2 rounded-full text-center' style={{ whiteSpace: 'nowrap' }}>{matchedSkill}</span>
                                ))}
                            </div>
                            <div className='mt-2 text-xl font-semibold'>
                                Unmatched Skills:
                            </div>
                            <div className='mt-2 flex flex-row gap-3 overflow-x-scroll items-center' style={{ scrollbarWidth: 1 }}>
                                {/* Display the unmatched skills */}
                                {selectedCandidate.unmatch.map((unmatchedSkill, index) => (
                                    <span key={index} className='bg-red-600 text-white px-4 py-2 rounded-full text-center' style={{ whiteSpace: 'nowrap' }}>{unmatchedSkill}</span>
                                ))}
                            </div>
                            <div className='mt-3 text-center bg-slate-200 p-3'>
                                <span className="font-semibold text-center">Percentage Matching:</span> {selectedCandidate.rank}%
                            </div>
                        </div>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailedModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default JobCard;
