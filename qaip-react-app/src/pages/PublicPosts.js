import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import PublicPost from "../components/PublicPost";
import { useRef } from "react";
import Axios from "axios";

function PublicPosts() {


  function reload(){
    setRefreshKey(oldKey => oldKey +1);
  }

  const [isLoading, setISLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [loadUsers, setLoadUsers] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const idRef = useRef();
  const nameRef = useRef();
  const descRef = useRef(); 
  const subjRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const entIdRef = parseInt(idRef.current.value);
    const entNameRef = nameRef.current.value;
    const entDescRef = descRef.current.value;
    const entSubjRef = parseInt(subjRef.current.value);


    Axios.post("https://localhost:44350/api/publicposts", {
      userId: entIdRef,
      postName: entNameRef,
      postDesc: entDescRef,
      subjectId: entSubjRef,
      photoFileName:""
    }).then(() => setRefreshKey((oldKey) => oldKey + 1));
    handleClose();
    handleClose();
  }

  useEffect(() => {
    setISLoading(true);
    fetch("https://localhost:44350/api/publicposts")
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
            <th>User ID</th>
            <th>Subject ID</th>
            <th>Post Name</th>
            <th>Post Desc</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loadUsers.map((user) => (
            <PublicPost
              key={user.id}
              postId={user.postId}
              userId={user.userId}
              subjectId={user.subjectId}
              postName={user.postName}
              postDesc={user.postDesc}
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
          <Modal.Title>Add new Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="forID">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" placeholder="UserID" ref={idRef} />
              <br></br>
            </Form.Group>
            <Form.Group controlId="forName">
              <Form.Label>Post Title</Form.Label>
              <Form.Control type="text" placeholder="Title" ref={nameRef} />
              <br></br>
            </Form.Group>
            <Form.Group controlId="forLastName">
              <Form.Label>Post Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                ref={descRef}
              />
              <br></br>
            </Form.Group>
            <Form.Group controlId="forDepartment">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" placeholder="SubjectID" ref={subjRef} />
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

export default PublicPosts;
