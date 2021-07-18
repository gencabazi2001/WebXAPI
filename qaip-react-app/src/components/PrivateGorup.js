import React from 'react';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useState ,useRef} from "react";
import {Modal,Form} from 'react-bootstrap'

function PrivateGorup(props) {

    const uIdRef = useRef();
    const nameRef = useRef();
    const descRef = useRef();
    const DOCRef = useRef();

    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function editHandler(e){
        e.preventDefault();
        const entUIdRef = uIdRef.current.value;
        const entNameRef = nameRef.current.value;
        const entDescRef = descRef.current.value;
        const entDOCRef = DOCRef.current.value;
        axios.put('https://localhost:44350/api/privategroups/'+props.pgId,{
            pgId: props.pgId,
            userId: entUIdRef,
            pgName: entNameRef,
            pgDescription: entDescRef,
            dateOfCreation: entDOCRef
          
        } ).then(()=>props.reload());
        
        handleClose();
    }

    function deleteHandler(id){
        console.log(id);
         fetch('https://localhost:44350/api/privategroups/'+id,{
             method:'DELETE',
             header:{'Accept':'application/json',
            'Content-Type':'application/json'}
         }).then(()=>{
            history.replace('/pgroups')
          }).then(()=>props.reload());
    }
    return (
        <tr>
            <td>{props.pgId}</td>
            <td>{props.userId}</td>
            <td>{props.pgName}</td>
            <td>{props.pgDescription}</td>
            <td>{props.DateOfCreation}</td>
            <td><Button style={{margin:10}} variant="primary" onClick={handleShow}>Edit</Button >
            <Button  variant="danger" onClick={()=>(deleteHandler(props.pgId))}>Delete</Button></td>

            <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Edit Private Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={editHandler}>
             
              <Form.Group controlId="forName">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="user ID"
                  ref={uIdRef}
                />
                <br></br>
              </Form.Group>
              <Form.Group controlId="forLastName">
                <Form.Label>PGName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  ref={nameRef}
                />
                <br></br>
              </Form.Group>
              <Form.Group controlId="forDepartment">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  ref={descRef}
                />
                <br></br>
              </Form.Group>
  
              <Form.Group controlId="formBasicEmail">
                <Form.Label>DateOfCreation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="dateofCreation"
                  ref={DOCRef}
                />
               
                <br></br>
              </Form.Group>
  
            
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
         
        </Modal>
        </tr>
    )
}

export default PrivateGorup
