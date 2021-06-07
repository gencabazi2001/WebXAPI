import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import User from "../components/User";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import PrivateGorup from "../components/PrivateGorup";
import axios from "axios";


function PGroups() {
    const [isLoading, setISLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [loadUsers, setLoadUsers] = useState([]);

    function reload(){
      setRefreshKey(oldKey => oldKey +1);
    }
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history = useHistory();
      
    const pgIdRef = useRef();
    const uIdRef = useRef();
    const nameRef = useRef();
    const descRef = useRef();
    const DOCRef = useRef();
   
    function submitHandler(event) {
      event.preventDefault();
      const entpgIdRef = parseInt(pgIdRef.current.value);
      const entUIdRef = uIdRef.current.value;
      const entNameRef = nameRef.current.value;
      const entDescRef = descRef.current.value;
      const entDOCRef = DOCRef.current.value;
      
     
      axios.post("https://localhost:44350/api/privategroups",{
        pgId: entpgIdRef,
        userId: entUIdRef,
        pgName: entNameRef,
        pgDescription: entDescRef,
        dateOfCreation: entDOCRef
      }).then(() => setRefreshKey(oldKey => oldKey +1));
      handleClose();
       
      
      
    
  
  }
  
    useEffect(() => {
      setISLoading(true);
      fetch("https://localhost:44350/api/privategroups")
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
              <th>userID</th>
              <th>Private Group</th>
              <th>Description</th>
              <th>DateOfCreation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadUsers.map((user) => (
              <PrivateGorup
                key={user.id}
                pgId={user.pgId}
                userId={user.userId}
                pgName={user.pgName}
                pgDescription={user.pgDescription}
                DateOfCreation={user.dateOfCreation}
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
            <Modal.Title>Add a new Provate Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="forID">
                <Form.Label>pgID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter pgID"
                  ref={pgIdRef}
                />
                <br></br>
              </Form.Group>
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
      
      </div>
    )
}

export default PGroups
