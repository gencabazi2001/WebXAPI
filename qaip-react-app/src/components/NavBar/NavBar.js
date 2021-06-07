import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'

function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/users">Users</Nav.Link>
      <Nav.Link href="/subjects">Subjects</Nav.Link>
      <Nav.Link href="/publicposts">Public Posts</Nav.Link>
      <Nav.Link href="/pgroups">Private Groups</Nav.Link>
      <Nav.Link href="/groupmembers">Group Members</Nav.Link>
      <Nav.Link href="/departments">Departments</Nav.Link>
      
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
    )
}

export default NavBar
