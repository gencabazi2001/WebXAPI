import React from 'react'
import {Navbar,Nav,Button} from 'react-bootstrap'
import { useHistory } from 'react-router';
import { useState,useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


function NavBar() {
  const history = useHistory();
  const [logged,setLogged] =  useState(false)

  function logoutHandler(){
    setLogged(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/')
  }
  useEffect(() => {
    if(localStorage.getItem("token")!=null){
      setLogged(true);
    }
  }, [logged])


    return (
      <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark" style={{paddingLeft:"20px",paddingRight:"20px"}}>
      <Navbar.Brand href="#home">Q.A.I.P.</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto" >
          
        <Nav.Link href="/users">Users</Nav.Link>
      <Nav.Link href="/subjects">Subjects</Nav.Link>
      <Nav.Link href="/publicposts">Public Posts</Nav.Link>
      <Nav.Link href="/pgroups">Private Groups</Nav.Link>
      <Nav.Link href="/groupmembers">Group Members</Nav.Link>
      <Nav.Link href="/departments">Departments</Nav.Link>
     <Nav.Item >

    {logged&& <Button variant="danger" onClick={logoutHandler}>LogOut</Button> }
  
     </Nav.Item>
    
        </Nav>
        
      </Navbar.Collapse>
      
    </Navbar>
    )
}

export default NavBar
