import React from 'react';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useState,useRef} from "react";
import {Modal,Form} from 'react-bootstrap'

function Subject(props) {
    const history = useHistory();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const codeRef=useRef();
    const nameRef = useRef();
    const depRef = useRef();
    const semRef = useRef();
    const descRef = useRef();
    const ectsRef = useRef();
    function editHandler(e){
        e.preventDefault();
        const entCodeRef = codeRef.current.value;
        const entNameRef = nameRef.current.value;
        const entDepRef = depRef.current.value;
        const entSemRef = semRef.current.value;
        const entDescRef = descRef.current.value;
        const entECTSRef = ectsRef.current.value;


        axios.put("https://localhost:44350/api/Subjects/"+props.subjectId,{
            subjectId:props.subjectId,
            subjectCode:entCodeRef,
            subjectName: entNameRef,
            departmentId: entDepRef,
            subjectSemester: entSemRef,
            subjectEcts: entECTSRef,
            subjectDescription: entDescRef
    

        }).then((res) => console.log(res.data)).then(()=>props.reload());
        handleClose();
    }

    function deleteHandler(id){
        console.log(id);

         axios.delete('https://localhost:44350/api/subjects/'+id)
         .then(()=>{
            history.replace('/subjects')
          }).then(()=>props.reload());
    }
    return (
        <tr>
            <td>{props.subjectId}</td>
            <td>{props.subjectName}</td>
            <td>{props.subjectCode}</td>
            <td>{props.subjectSemester}</td>
            <td>{props.departmentId}</td>
            <td>{props.subjectDescription}</td>
            <td>{props.subjectEcts}</td>
            <td><Button style={{margin:10}} variant="primary" onClick={handleShow}>Edit</Button >
            <Button  variant="danger" onClick={()=>(deleteHandler(props.subjectId))}>Delete</Button></td>



            <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Add a new Subject</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={editHandler}>
           
              <Form.Group controlId="forName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name..."
                  ref={nameRef}
                />
                <br></br>
              </Form.Group>
              <Form.Group controlId="forSubjectCode">
                <Form.Label>Subject Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Code"
                  ref={codeRef}
                />
                <br></br>
              </Form.Group>
              <Form.Group controlId="forLastName">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Department..."
                  ref={depRef}
                />
                <br></br>
              </Form.Group>
              <Form.Group controlId="forDepartment">
                <Form.Label>Semester</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Semester..."
                  ref={semRef}
                />
                <br></br>
              </Form.Group>
  
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Desc..."
                  ref={descRef}
                />
               
                <br></br>
              </Form.Group>
  
              <Form.Group controlId="formBasicPassword">
                <Form.Label>ECTS</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ECTS..."
                  ref={ectsRef}
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

export default Subject
