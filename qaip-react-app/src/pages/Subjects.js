import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Subject from "../components/Subject";
import { useRef } from "react";
import React from 'react'
import axios from 'axios'

function Subjects() {
    const [isLoading, setISLoading] = useState(false);

    const [refreshKey, setRefreshKey] = useState(0);
    const [loadUsers, setLoadUsers] = useState([]);
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function reload(){
      setRefreshKey(oldKey=>oldKey+1);
    }
    const codeRef=useRef();
    const nameRef = useRef();
    const depRef = useRef();
    const semRef = useRef();
    const descRef = useRef();
    const ectsRef = useRef();
    function submitHandler(event) {
      event.preventDefault();
      const entCodeRef = codeRef.current.value;
      const entNameRef = nameRef.current.value;
      const entDepRef = depRef.current.value;
      const entSemRef = semRef.current.value;
      const entDescRef = descRef.current.value;
      const entECTSRef = ectsRef.current.value;
     
      
      axios.post("https://localhost:44350/api/Subjects",{
        subjectCode:entCodeRef,
        subjectName: entNameRef,
        departmentId: entDepRef,
        subjectSemester: entSemRef,
        subjectEcts: entECTSRef,
        subjectDescription: entDescRef

      }).then(() => setRefreshKey(oldKey => oldKey +1));
      handleClose();
  
  }
  
    useEffect(() => {
      setISLoading(true);
      fetch("https://localhost:44350/api/Subjects")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const users = [];
          for (const key in data) {
            const user = {
              id: key,
              ...data[key],
            };
            console.log(user);
            users.push(user);
          }
          setISLoading(false);
          setLoadUsers(users);
          console.log(users)
        }); 
    }, [refreshKey]);
    if (isLoading) {
      return (
        <section>
          <p>Loading...</p>
        </section>
      );
    }
    return (
        <div className="border">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Emri</th>
              <th>Code</th>
              <th>Semestri</th>
              <th>DepID</th>           
              <th>Description</th>
              <th>ECTS</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadUsers.map((user) => (
              <Subject
                key={user.id}
                subjectId={user.subjectId}
                subjectName={user.subjectName}
                subjectCode={user.subjectCode}
                subjectSemester={user.subjectSemester}
                departmentId={user.departmentId}
                subjectDescription={user.subjectDescription}
                subjectEcts={user.subjectEcts}
                reload={reload}
              />
            ))}
          </tbody>
        </Table>
            
        <Button variant="info" onClick={handleShow}>
          Add+
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Add a new Subject</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitHandler}>
           
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
      
      </div>
    )
}

export default Subjects
