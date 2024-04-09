import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function HomeNavbar(props) {
  const [login, setLogin] = useState(false);
  const [upload, setUpload] = useState(false);

  const [hrhome, setHrHome] = useState(false);
  const [post,setPost]=useState(false);

  useEffect(() => {
    if (props.props === "login") {
      setLogin(true);
      setUpload(false);
      setHrHome(false);
      setPost(false);
      console.log(props.props);
    }
    if (props.props === "Upload") {
      setLogin(false);
      setUpload(true);
      setHrHome(false);
      setPost(false);
      console.log(props.props);
    }
    if (props.props === "hrhome") {
      setLogin(false);
      setUpload(false);
      setHrHome(true);
      setPost(false);
      console.log(props.props);
    }
    if (props.props === "post") {
      setLogin(false);
      setUpload(false);
      setHrHome(false);
      setPost(true);
      console.log(props.props);
    }
  }, [props.props]); // Run the effect only when props.props changes

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Resume Ranker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ">
            {login &&
              <>
                <Nav.Link href="/hr">HR Login</Nav.Link>
              </>}
            {upload &&
              <>
                <Nav.Link href="/jobs">Jobs</Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>
              </>}
            {hrhome &&
              <>
                <Nav.Link href="/hr/post">Post Job</Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>
              </>
            }
            {
              post &&
              <>
                <Nav.Link href="/hr/home">Hr HomePage</Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HomeNavbar;
