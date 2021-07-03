import {useState, useRef,useEffect}from "react";
import { Form, Button, Container, Col, Row,Badge,Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { useHistory} from 'react-router-dom'




function Main() {


    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const passwRef = useRef();
  const emailRef = useRef();
  const [isLogged,setIsLogged]=useState(false);
  const history = useHistory();

  
  const idRef = useRef();
  const nameRef = useRef();
  const lNameRef = useRef();
  const passRef = useRef();
  const emailref = useRef();
  const departmentRef = useRef();



  async function loginHandler(e){
    e.preventDefault();
 
    const entEmailRef = emailRef.current.value;
    const entPassRef = passwRef.current.value;
    var log = {
      userId:0,
      userEmail: entEmailRef,
      userPassword: entPassRef,
      userDepartment:0
    }
      return Axios
        .post('https://localhost:44350/api/users/login',log)
        .then((response) => {localStorage.setItem('token',response.data.token)
        console.log(response.data.token)}).then(()=>{setIsLogged(true)});
   
  }
  useEffect(()=>{
    
    console.log(isLogged)
if(isLogged){
    history.replace('/profile')
}
  },[isLogged])

  
  function submitHandler(event) {
    event.preventDefault();
    const entIdRef = parseInt(idRef.current.value);
    const entNameRef = nameRef.current.value;
    const entlNameRef = lNameRef.current.value;
    const entPassRef = passRef.current.value;
    const entEmailRef = emailref.current.value;
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
     
    });
    handleClose();
  }
  return (
    <Container
      style={{
        backgroundImage: `url("https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png")`,
        height: "100vh",
        width:"100vw"
      }}
      className="d-flex flex-column justify-content-center w-100"
    >
          <h1 className="text-center">
   <Badge variant="primary">Welcome to Q.A.I.P.</Badge>
  </h1>
      <Row >
          <Col>
      </Col>
    
      <Col style={{backgroundColor:"#ace4fa",borderRadius:"5px",padding:"20px"}}>
        <Form  onSubmit={loginHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
          </Form.Group>
      <br></br>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={passwRef}/>
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
          onSubmit={submitHandler}
          >
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
                ref={emailref}
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
                ref={passRef}
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
