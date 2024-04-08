import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useUser } from '../context/allContext';
import HomeNavbar from './../components/Navbar';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control modal visibility
    const [showFailureModal, setShowFailureModal] = useState(false); // State to control modal visibility
    const [submitClick, setSubmitClick] = useState(false); // State to check if submit button is clicked
    const { email, setEmail } = useUser();
    const { name, setName } = useUser();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        // Check if the selected file is PDF or DOCX
        if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setFile(selectedFile);
        } else {
            alert('Please upload a PDF or DOCX file.');
        }
    };

    const handleSubmit = () => {
        // Perform submission logic here
        // For demonstration purposes, just showing the modal
        if (file) {
            setShowSuccessModal(true);
            setSubmitClick(true);
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
                        <div className='text-4xl font-semibold'>Hello, {name}</div>
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
                <div className=' mt-3 ml-28 h-96 bg-slate-100 mr-2 min-h-fit w-100 rounded-lg p-4'>
                    <div className='font-bold text-3xl'>
                        Your Analyzed Resume:
                    </div>
                    {submitClick == false ? <div>Upload your resume first</div> :
                        <div>
                            <div className='mt-2'>
                                {/* Display the uploaded file name */}
                                {file && <div>File Name: {file.name}</div>}
                            </div>

                            {/* Your skills */}
                            <div>
                                <div className='mt-2 text-xl font-semibold'>
                                    Your skills:
                                </div>
                                <div className='mt-2 flex flex-row gap-3'>
                                    {/* Display the skills extracted from the resume */}
                                    <span className='bg-blue-600 text-white px-4 py-2 rounded-full'>Java</span>
                                    <span className='bg-blue-600 text-white px-4 py-2 rounded-full'>React</span>
                                    <span className='bg-blue-600 text-white px-4 py-2 rounded-full'>Node.js</span>
                                    <span className='bg-blue-600 text-white px-4 py-2 rounded-full'>Express</span>
                                    <span className='bg-blue-600 text-white px-4 py-2 rounded-full'>Python</span>
                                </div>
                            </div>
                            {/* Recommended Skilss */}
                            <div>
                                <div className='mt-4 text-xl font-semibold'>
                                    Recommended skills:
                                </div>
                                <div className='mt-2 flex flex-row gap-3'>
                                    {/* Display the skills extracted from the resume */}
                                    <span className='bg-blue-600 text-white px-4 py-2 rounded-full'>Java</span>
                                    <span className='bg-blue-600 text-white px-4 py-2 rounded-full'>React</span>
                                    <span className='bg-blue-600 text-white px-4 py-2 rounded-full'>Node.js</span>
                                    <span className='bg-blue-600 text-white px-4 py-2 rounded-full'>Express</span>
                                    <span className='bg-blue-600 text-white px-4 py-2 rounded-full'>Python</span>
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
