import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useRef } from "react";
import GroupMember from "../components/GroupMember";
import axios from "axios";

function GroupMembers() {
  const [isLoading, setISLoading] = useState(false);

  const [loadUsers, setLoadUsers] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [show, setShow] = useState(false);

  function reload(){
    setRefreshKey(oldKey => oldKey +1);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
      
    const subjectIDRef = useRef();
    const userIDRef = useRef();
    const DOJRef = useRef();
    
    function submitHandler(event) {
      event.preventDefault();
      const entSIDRef = parseInt(subjectIDRef.current.value);
      const entUIDRef = parseInt(userIDRef.current.value);
      const entDOJRef = DOJRef.current.value;
    
     axios.post("https://localhost:44350/api/groupmembers",
      {
        subjectId: entSIDRef,
        userId: entUIDRef,
        dateOfJoining: entDOJRef
      }).then(() => setRefreshKey(oldKey => oldKey +1));
      handleClose();
  }
  
    useEffect(() => {
      setISLoading(true);
      fetch("https://localhost:44350/api/groupmembers")
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
              <th>SubjectID</th>
              <th>UserID</th>
              <th>DateOfJoining</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadUsers.map((user) => (
              <GroupMember
                key={user.id}
                subjectId={user.subjectId}
                userId={user.userId}
                dateOfJoining={user.dateOfJoining}
                reload={reload}
              />
         
              
            )) }
          </tbody>
        </Table>
            
        <Button variant="info" onClick={handleShow}>
          Add+
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Add a new Group Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="forID">
                <Form.Label>SubjectID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Subject ID"
                  ref={subjectIDRef}
                />
                <br></br>
              </Form.Group>
              <Form.Group controlId="forName">
                <Form.Label>UserID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="User ID"
                  ref={userIDRef}
                />
                <br></br>
              </Form.Group>
              <Form.Group controlId="forLastName">
                <Form.Label>Date Of Joining</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="yyyy-mm-dd"
                  ref={DOJRef}
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

export default GroupMembers
