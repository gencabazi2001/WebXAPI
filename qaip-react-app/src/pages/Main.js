import {useState}from "react";
import { Form, Button, Container, Col, Row,Badge,Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Main() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container
      style={{
        backgroundImage: `url("https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png")`,
        height: "100vh",
      }}
      className="d-flex flex-column justify-content-center"
    >
          <h1 className="text-center">
   <Badge variant="primary">Welcome to Q.A.I.P.</Badge>
  </h1>
      <Row >
          <Col>
      </Col>
    
      <Col style={{backgroundColor:"#8BCEFF",borderRadius:"5px",padding:"20px"}}>
        <Form  >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
      <br></br>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
            <Form.Group className="d-flex">
                <Col>
          <Button  variant="primary" type="submit">
            Login
          </Button>
          </Col>
          <Col></Col>
          <Col className="d-flex justify-content-end">
          <Button  onClick={handleShow} variant="primary">
            Register
          </Button>
          </Col>
          </Form.Group>
         
        </Form>
        </Col>
        <Col>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create free Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form 
         // onSubmit={submitHandler}
          >
            <Form.Group controlId="forID">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter userID"
               // ref={idRef}
              />
              <br></br>
            </Form.Group>
            <Form.Group controlId="forName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name"
           //     ref={nameRef}
              />
              <br></br>
            </Form.Group>
            <Form.Group controlId="forLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user last name"
         //       ref={lNameRef}
              />
              <br></br>
            </Form.Group>
            <Form.Group controlId="forDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department"
//ref={departmentRef}
              />
              <br></br>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
         //       ref={emailRef}
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
        //        ref={passwRef}
              />
              <br></br>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
            
              <br></br>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
      
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Main;
