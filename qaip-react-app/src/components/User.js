import React from 'react';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useState ,useRef} from "react";
import {Modal,Form} from 'react-bootstrap'
function User(props) {



    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const idRef = useRef();
    const nameRef = useRef();
    const lNameRef = useRef();
    const passwRef = useRef();
    const emailRef = useRef();
    const departmentRef = useRef();

    function editHandler(e){
        e.preventDefault();

    const entNameRef = nameRef.current.value;
    const entlNameRef = lNameRef.current.value;
    const entPassRef = passwRef.current.value;
    const entEmailRef = emailRef.current.value;
    const entDepartmentRef = parseInt(departmentRef.current.value);

        axios.put('https://localhost:44350/api/users/'+props.userId,{
            userId: props.userId,
            userEmail: entEmailRef,
            userPassword: entPassRef,
            userFirstNAme: entNameRef,
            userLastName: entlNameRef,
            userDescription: "",
            userPhotoFileName: "",
            userDepartment: entDepartmentRef,
          
        } )
        .then(()=>{
          props.reloadUsers();
        });
        handleClose();
    }
    function deleteHandler(id){
        console.log(id);
         axios.delete('https://localhost:44350/api/Users/'+id,{
         
         }).then(()=>{
            history.replace('/users');
           
          }).then(()=>{
            props.reloadUsers();
          });
    }
    return (
        <tr>
            <td>{props.userId}</td>
            <td>{props.userFirstName}</td>
            <td>{props.userLastName}</td>
            <td>{props.userEmail}</td>
            <td>{props.userDepartment}</td>
            <td><Button style={{margin:10}} variant="primary" onClick={handleShow} >Edit</Button >
            <Button  variant="danger" onClick={()=>{deleteHandler(props.userId); }}>Delete</Button></td>


            <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editHandler}>
            <Form.Group controlId="forID">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder={props.userId}
                value={props.userId}
                ref={idRef}
                readOnly
              />
              <br></br>
            </Form.Group>
            <Form.Group controlId="forName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name"
                ref={nameRef}
              />
              <br></br>
            </Form.Group>
            <Form.Group controlId="forLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user last name"
                ref={lNameRef}
              />
              <br></br>
            </Form.Group>
            <Form.Group controlId="forDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department"
                ref={departmentRef}
              />
              <br></br>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <br></br>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwRef}
              />
              <br></br>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
           
              <br></br>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </tr>
    )
}

export default User
