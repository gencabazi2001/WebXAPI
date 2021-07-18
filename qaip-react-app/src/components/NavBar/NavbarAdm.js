import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router'
import { Navbar as BNavbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import styles from './Navbar.module.css'

function NavbarAdm() {

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
            <BNavbar.Brand href="#">Q.A.I.P. Dashboard</BNavbar.Brand>
            <BNavbar.Toggle aria-controls="navbarScroll" />
            <BNavbar.Collapse id="navbarScroll" className="justify-content-md-between">
                <Nav
                    className="mr-auto my-2 my-lg-0 justify-content-md-around"
                    style={ { maxHeight: '100px', width: '40%' } }
                    navbarScroll
                >
            
                 
                    {/* { adm ? (<Nav.Link href="#" >
                        Admin Dashboard
                    </Nav.Link>) : null }
                    {console.log(adm+"adm")} */}
                </Nav>

                <div className="d-flex" > 

                    <Button style={ { marginLeft: '15px' } } variant="danger" onClick={ () => logoutHandler() }>Log out</Button></div>
            </BNavbar.Collapse>
        </BNavbar>

    );
}

export default NavbarAdm ;
