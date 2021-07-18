import React from 'react';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useState ,useRef} from "react";
import {Modal,Form} from 'react-bootstrap'

function Ankesa(props) {

    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userIdRef = useRef();
    const descriptionRef = useRef();


    function editHandler(e){
        e.preventDefault();

        const entUserIdRef = parseInt(userIdRef.current.value);
        const entDescRef = descriptionRef.current.value;

        axios.put('https://localhost:44350/api/Ankesat/'+props.id,{
            id: props.id,
            userId: entUserIdRef,
            description: entDescRef,
            ankesaUserNavigation: props.ankesaUserNavigation
        })
        .then(()=>{
          props.reloadAnkesat();
        });
        handleClose();
    }
    function deleteHandler(id){
        console.log(id);
         axios.delete('https://localhost:44350/api/Ankesat/'+id,{
         
         }).then(()=>{
            history.replace('/dashboard');
           
          }).then(()=>{
            props.reloadAnkesat();
          });
    }
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.userId}</td>
            <td>{props.userFirstName}</td>
            <td>{props.userLastName}</td>
            <td>{props.userEmail}</td>
            <td>{props.description}</td>
            <td><Button style={{margin:10}} variant="primary" onClick={handleShow} >Edit</Button >
            <Button variant="danger" onClick={()=>{deleteHandler(props.id); }}>Delete</Button></td>


            <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Issues</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editHandler}>
            <Form.Group controlId="forID">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder={props.id}
                value={props.id}
                readOnly
              />
              <br></br>
            </Form.Group>
            <Form.Group controlId="forName">
              <Form.Label>User Id</Form.Label>
              <Form.Control
                type="text"
                placeholder={props.userId}
                ref={userIdRef}
              />
              <br></br>
            </Form.Group>
            <Form.Group controlId="forLastName">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Enter issue description"
                ref={descriptionRef}
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

export default Ankesa
