import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Logo2 from '../images/logo2.png';
import { useEffect, useState } from 'react';
import axios from 'axios';


const CandidateCard = () => {
    useEffect(() => {
        getJobs();
        console.log(jobs);
    })
    const [jobs, setJobs] = useState([]);

    const getJobs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/getjobs');
            const data = response.data;
            setJobs(data);
        }
        catch (error) {
            console.log(error.message);
        }
    }


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
    return (
        <div className='flex flex-row gap-3'>
            {
                jobs.map((job) => (
                    <div>
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
                                    <Button variant="outline-primary" >View Details</Button>
                                    <Button variant="outline-success" >Apply</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))
            }

        </div>
    );
}

export default CandidateCard;