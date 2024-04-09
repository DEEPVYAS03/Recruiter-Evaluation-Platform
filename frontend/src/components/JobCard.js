import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Logo2 from '../images/logo2.png';
function JobCard() {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={Logo2} />
                <Card.Body>
                    <Card.Title>React Native Developer</Card.Title>
                    <Card.Text>
                        <div>
                            <span className='font-semibold'>Company:</span> Delloite
                        </div>
                        <div>
                            <span className='font-semibold'>Salary:</span> 12000
                        </div>
                        <div>
                            <span className='font-semibold'>Deadline:</span> date
                        </div>
                    </Card.Text>
                    <div className='flex flex-row justify-around'>
                        <Button variant="outline-primary">View Details</Button>
                        <Button variant="outline-success">Apply</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default JobCard;