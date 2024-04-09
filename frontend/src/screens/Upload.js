import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useUser } from '../context/allContext';
import HomeNavbar from './../components/Navbar';
import axios from 'axios';


const Upload = () => {
    const [file, setFile] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control modal visibility
    const [showFailureModal, setShowFailureModal] = useState(false); // State to control modal visibility
    const [submitClick, setSubmitClick] = useState(false); // State to check if submit button is clicked
    const { email, setEmail } = useUser();
    const { name, setName } = useUser();
    const { phone, setPhone } = useUser();
    const { linkedin, setLinkedin } = useUser();
    const { skills, setSkills } = useUser();
    const { recommskills, setRecommskills } = useUser();
    const { tips, setTips } = useUser();




    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        // Check if the selected file is PDF or DOCX
        if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setFile(selectedFile);
        } else {
            alert('Please upload a PDF or DOCX file.');
        }
    };

    const handleSubmit = async () => {
        // Perform submission logic here
        // For demonstration purposes, just showing the modal
        if (file) {
            setShowSuccessModal(true);
            setSubmitClick(true);
            console.log(email);
            const response = await axios.get(`http://localhost:5000/api/user/${email}`);
            const data = await response.data;
            console.log(data);
            setPhone(data.phone);
            setLinkedin(data.linkedin);
            console.log(data.skills);
            setSkills(data.skills);
            setRecommskills(data.recommskills);
            setTips(data.tips);
    
        }
        else {
            setShowFailureModal(true);
        }

    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        setShowFailureModal(false);
    };


    return (
        <>
            <HomeNavbar props={'Upload'} />
            <div className='d-flex flex-column flex-md-row min-h-screen'>
                <div className='w-100'>
                    <div className='mt-10 ml-28'>
                        <div className='text-4xl font-semibold'>Hello, {localStorage.getItem('username')}</div>
                        <div className='mt-5 text-2xl'>
                            <div>
                                Please upload your resume here:
                            </div>
                            <div className='bg-gray-200 w-8/12 h-12 mt-4 p-1 rounded-lg'>
                                <input
                                    className='h-full w-full'
                                    type="file"
                                    accept=".pdf,.docx"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className='text-base'>
                                Only .docx or .pdf file type are Allowed
                            </div>
                            <div className='mt-10 ml-56'>
                                <Button variant="primary" size='lg' style={{ padding: '10px 80px' }} onClick={handleSubmit}>Submit</Button>{' '}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' mt-3 ml-28  bg-slate-100 mr-2 w-100 overflow-hidden h-max rounded-lg p-4 '>
                    <div className='font-bold text-3xl'>
                        Your Analyzed Resume:
                    </div>
                    {submitClick === false ? <div>Upload your resume first</div> :
                        <div>

                            <div className='mt-2'>
                                {/* Display the uploaded file name */}
                                {file && <div>File Name: {file.name}</div>}
                            </div>

                            {/* Your Basic info */}
                            <div>
                                <div className='mt-2 text-xl font-semibold'>
                                    Your Basic Info:
                                </div>
                                <div>
                                    <div><span className='font-semibold'>Name:</span> {name}</div>
                                    <div><span className='font-semibold'>Email:</span> {email}</div>
                                    <div><span className='font-semibold'>Phone:</span> {phone}</div>
                                    <div><span className='font-semibold'>Linkedin:</span> <a href={linkedin} target="_blank" rel="noopener noreferrer">{linkedin}</a></div>
                                </div>
                            </div>

                            {/* Your skills */}
                            <div>
                                <div className='mt-2 text-xl font-semibold'>
                                    Your skills:
                                </div>
                                <div className='mt-2 flex flex-row gap-3 overflow-x-scroll items-center' style={{ scrollbarWidth: 1 }}>
                                    {/* Display the skills extracted from the resume */}
                                    {skills.map((skill, index) => (
                                        <span key={index} className='bg-blue-600 text-white px-4 py-2 rounded-full text-center'  style={{ whiteSpace: 'nowrap' }}>{skill}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Recommended Skills */}
                                
                            <div>
                                <div className='mt-2 text-xl font-semibold'>
                                    Recommended skills:
                                </div>
                                <div className='mt-2 flex flex-row gap-3 overflow-x-scroll items-center' style={{ scrollbarWidth: 1 }}>
                                    {/* Display the skills extracted from the resume */}
                                    {recommskills.map((skill, index) => (
                                        <span key={index} className='bg-blue-600 text-white px-4 py-2 rounded-full text-center'  style={{ whiteSpace: 'nowrap' }}>{skill}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Tips */}
                            <div>
                                <div className='mt-4 text-xl font-semibold'>
                                    Resume Tips:
                                </div>
                                <div className='mt-2'>
                                    <div className='font-semibold'>1. Use bullet points to describe your work experience</div>
                                    <div className='font-semibold'>2. Use action verbs to describe your work experience</div>
                                    <div className='font-semibold'>3. Use a professional email address</div>
                                </div>
                            </div>

                            {/* Recommended Video */}
                            <div>
                                <div className='mt-4 text-xl font-semibold'>Resume Writing tips:</div>
                                <div className='mt-2 mb-4'>
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/Tt08KmFfIYQ?si=-x1cFYa1py75aXhY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                </div>
                            </div>
                        </div>
                    }

                </div>
                {/* Modal for success message */}
                <Modal show={showSuccessModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Your resume has been uploaded and screened successfully.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showFailureModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Failure</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Please Upload Resume First
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default Upload;
