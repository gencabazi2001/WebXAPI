import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router'
import { Navbar as BNavbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import styles from './Navbar.module.css'

function Navbar() {

    const history = useHistory();
    const [logged, setLogged] = useState(false)
    



    function logoutHandler() {
        setLogged(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        history.push('/')
    }

    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            setLogged(true);
         
        }
        
      
    }, [logged])

    return (
        <BNavbar bg="dark" expand variant="dark" className="p-2">
            <BNavbar.Brand href="#">Q.A.I.P.</BNavbar.Brand>
            <BNavbar.Toggle aria-controls="navbarScroll" />
            <BNavbar.Collapse id="navbarScroll" className="justify-content-md-between">
                <Nav
                    className="mr-auto my-2 my-lg-0 justify-content-md-around"
                    style={ { maxHeight: '100px', width: '40%' } }
                    navbarScroll
                >
            
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/feed">Feed</Nav.Link>
                    <Nav.Link href="/privategroups">Private Groups</Nav.Link>
                    <Nav.Link href="/ContactUs">Contact Us</Nav.Link>

                    {/* { adm ? (<Nav.Link href="#" >
                        Admin Dashboard
                    </Nav.Link>) : null }
                    {console.log(adm+"adm")} */}
                </Nav>

                <div className="d-flex" > <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="mr-2"
                        aria-label="Search"
                    />
                    <Button className={ styles.myBttn } style={ { marginLeft: '5px' } } variant="outline-success">Search</Button>
                    {/* <button style={ { marginLeft: '5px' } } type="button" class="btn btn-outline-success">Success</button> */ }
                </Form>

                    <Button style={ { marginLeft: '15px' } } variant="danger" onClick={ () => logoutHandler() }>Log out</Button></div>
            </BNavbar.Collapse>
        </BNavbar>

    );
}

export default Navbar;
