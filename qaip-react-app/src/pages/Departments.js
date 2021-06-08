import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Department from "../components/Department";
import { useRef } from "react";
import axios from "axios";
function Departments() {
    const [isLoading, setISLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [loadUsers, setLoadUsers] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

      function reload(){
        setRefreshKey(oldKey => oldKey +1)
      }
      
    const nameRef = useRef();
    const descRef = useRef();
    const semRef = useRef();

    function submitHandler(event) {
      event.preventDefault();
      
      const entNameRef = nameRef.current.value;
      const entDescRef = descRef.current.value;
      const entSemRef = parseInt(semRef.current.value);
  
          
      axios.post( "https://localhost:44350/api/departments",{
        departmentName: entNameRef,
        departmentDescription: entDescRef,
        departmentSemesters: entSemRef,
        isActive: true
      }).then(() => setRefreshKey(oldKey => oldKey +1));
      handleClose();
  
  }
  


    useEffect(() => {
      setISLoading(true);
      fetch("https://localhost:44350/api/departments")
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
          <th>Department ID</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th>Semesters</th>
            <th>Actions</th>
         
          </tr>
        </thead>
        <tbody>
          {console.log(loadUsers)}
          {loadUsers.map((user) => (
            <Department
              key={user.id}
              departmentId={user.departmentId}
              departmentName={user.departmentName}
              departmentDescription={user.departmentDescription}
              departmentSemesters={user.departmentSemesters}
              isActive={user.isActive}
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
          <Modal.Title>Add a new Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
           
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
    
    </div>
    )
}

export default Departments
