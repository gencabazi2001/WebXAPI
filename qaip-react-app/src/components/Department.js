import React from 'react';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useState ,useRef} from "react";
import {Modal,Form} from 'react-bootstrap'
function Department(props) {

    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


   
    const nameRef = useRef();
    const descRef = useRef();
    const semRef = useRef();



    function editHandler(event) {
        event.preventDefault();
        
        const entNameRef = nameRef.current.value;
        const entDescRef = descRef.current.value;
        const entSemRef = parseInt(semRef.current.value);
    
            
        axios.put( "https://localhost:44350/api/departments/"+props.departmentId,{
            departmentId:props.departmentId,
          departmentName: entNameRef,
          departmentDescription: entDescRef,
          departmentSemesters: entSemRef,
          isActive: true
        }).then((res) => console.log(res.data)).then(()=>props.reload());
        handleClose();
    
    }


    function deleteHandler(id){
        console.log(id);
         fetch('https://localhost:44350/api/departments/'+id,{
             method:'DELETE',
             header:{'Accept':'application/json',
            'Content-Type':'application/json'}
         }).then(()=>{
            history.replace('/departments')
          }).then(()=>props.reload());
    }
    return (
      
        <tr>
            <td>{props.departmentId}</td>
            <td>{props.departmentName}</td>
            <td>{props.departmentDescription}</td>
            <td>{props.departmentSemesters}</td>
          
            <td><Button style={{margin:10}} variant="primary" onClick={handleShow}>Edit</Button >
            <Button  variant="danger" onClick={()=>(deleteHandler(props.departmentId))}>Delete</Button></td>



            
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add a new Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editHandler}>
           
            <Form.Group controlId="forName">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Department Name"
                ref={nameRef}
              />
              <br></br>
            </Form.Group>
            <Form.Group controlId="forLastName">
              <Form.Label>Department Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Department Description"
                ref={descRef}
              />
              <br></br>
            </Form.Group>
            <Form.Group controlId="forLastName">
              <Form.Label>Department Semesters</Form.Label>
              <Form.Control
                type="text"
                placeholder="Department Semesters"
                ref={semRef}
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

export default Department
