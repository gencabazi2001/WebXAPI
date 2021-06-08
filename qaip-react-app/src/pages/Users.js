import { Table, Button, Modal, Form, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import User from "../components/User";
import { useRef } from "react";
import Axios from "axios";

function Users(props) {

  console.log(props);


  const [isLoading, setISLoading] = useState(false);

  const [loadUsers, setLoadUsers] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const idRef = useRef();
  const nameRef = useRef();
  const lNameRef = useRef();
  const passwRef = useRef();
  const emailRef = useRef();
  const departmentRef = useRef();

  function reloadUsers(){
    setRefreshKey(oldKey => oldKey +1);
  }
 

  function submitHandler(event) {
    event.preventDefault();
    const entIdRef = parseInt(idRef.current.value);
    const entNameRef = nameRef.current.value;
    const entlNameRef = lNameRef.current.value;
    const entPassRef = passwRef.current.value;
    const entEmailRef = emailRef.current.value;
    const entDepartmentRef = parseInt(departmentRef.current.value);
    Axios.post("https://localhost:44350/api/users", {
      userId: entIdRef,
      userEmail: entEmailRef,
      userPassword: entPassRef,
      userFirstNAme: entNameRef,
      userLastName: entlNameRef,
      userDescription: "",
      userPhotoFileName: "",
      userDepartment: entDepartmentRef,
      userRole: "",
    }).then(() => setRefreshKey(oldKey => oldKey +1));
    handleClose();
  }


  useEffect(() => {
   
    setISLoading(true);
    fetch("https://localhost:44350/api/users")
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
      <section style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Spinner animation="grow" />
      </section>
    );
  }
  return (
    <div className="border">
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Dep</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loadUsers.map((user) => (
            <User 
              key={user.id}
              userId={user.userId}
              userFirstName={user.userFirstName}
              userLastName={user.userLastName}
              userEmail={user.userEmail}
              userDepartment={user.userDepartment}
              reloadUsers = {reloadUsers}
            />
          ))}
        </tbody>
      </Table>

      <Button variant="info" onClick={handleShow}>
        Add+
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add a new User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="forID">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter userID"
                ref={idRef}
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
         
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
     
      </Modal>
    </div>
  );
}

export default Users;
