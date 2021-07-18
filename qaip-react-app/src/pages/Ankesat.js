import { Table, Button, Modal, Form, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useRef } from "react";
import Axios from "axios";
import Ankesa from '../components/Ankesa'

function Ankesat(props) {

  console.log(props);


  const [isLoading, setISLoading] = useState(false);

  const [loadAnkesat, setLoadAnkesat] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

//   const idRef = useRef();
  const userIdRef = useRef();
  const descriptionRef = useRef();


  function reloadAnkesat(){
    setRefreshKey(oldKey => oldKey +1);
  }
 

  function submitHandler(event) {
    event.preventDefault();
    //  const entIdRef = parseInt(idRef.current.value);
    const entUserIdRef = parseInt(userIdRef.current.value);
    const entDescRef = descriptionRef.current.value;
    Axios.post("https://localhost:44350/api/Ankesat", {
    //    id: entIdRef,
      userId: entUserIdRef,
      description: entDescRef
    }).then(() => setRefreshKey(oldKey => oldKey +1));
    handleClose();
  }


  useEffect(() => {
   
    setISLoading(true);
    fetch("https://localhost:44350/api/Ankesat")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const ankesat = [];
        for (const key in data) {
          const ankesa = {
            id: key,
            ...data[key],
          };
          ankesat.push(ankesa);
        }
        console.log(ankesat);
        setISLoading(false);
        setLoadAnkesat(ankesat);
      });
  }, [refreshKey]);

  if (isLoading) {
    return (
      <section style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Spinner animation="grow" />
      </section>
    );
    }
  else{
    return (
        <div className="border">
        <Table>
            <thead>
            <tr>
                <th>#</th>
                <th>User Id</th>
                <th>User First Name</th>
                <th>User Last Name</th>
                <th>UserName</th>
                {/* <th>Date</th> */}
                <th>Issue Description</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {loadAnkesat.map((ankesa) => (
                <Ankesa 
                key={ankesa.id}
                id={ankesa.id}
                userId={ankesa.userId}
                description={ankesa.description}
                userFirstName={ankesa.ankesaUserNavigation.userFirstName}
                userLastName={ankesa.ankesaUserNavigation.userLastName}
                userEmail={ankesa.ankesaUserNavigation.userEmail}
                ankesaUserNavigation={ankesa.ankesaUserNavigation}         
                reloadAnkesat = {reloadAnkesat}
                />
            ))}
            </tbody>
        </Table>

        <Button variant="info" onClick={handleShow}>
            Add+
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
            <Modal.Title>Add a new Complaint</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="forName">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter user ID"
                    ref={userIdRef}
                />
                <br></br>
                </Form.Group>
                <Form.Group controlId="forLastName">
                <Form.Label>Issue Description</Form.Label>
                <Form.Control
                    as="textarea"
                    type="textbox"
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
        </div>
    );
}
}

export default Ankesat;
