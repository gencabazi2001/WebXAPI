import React from "react";
import {
  Col,
  Container,
  Row,
  Nav,
  ButtonGroup,
  Button,Spinner
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MyProfile from "../InterComponents/MyProfile";
import MyMedia from "../InterComponents/MyMedia";
import MyReplies from "../InterComponents/MyReplies";
import { useState, useEffect, } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
function Profile() {
  const [ProfileTab, setProfileTab] = useState(2);
  const [userData, setData] = useState({});
  const [fetched, setFetched] = useState(false);
  const [adm,setAdm] = useState(false);
  const history = useHistory();

 
  function profileHandler(e) {
    setProfileTab(e);
  }

   function renderElement() {
    while (!(userData.userDepartmentNavigation === undefined)) {
      var js = JSON.stringify(userData);
      localStorage.setItem("user", js);
      console.log(userData);
      if(userData.userRole==='admin'){
       history.replace('/dashboard')
      }
      if (ProfileTab == 1) return <MyReplies />;
      else if (ProfileTab == 2)
        return  (
          <MyProfile
             id= {userData.userId}
            name={userData.userFirstName}
            lname={userData.userLastName}
            department={userData.userDepartmentNavigation.departmentName}
            depId={userData.userDepartment}
            pic ={userData.userPhotoFileName}
            bio = {userData.userDescription}
            pass = {userData.userPassword}
            email={userData.userEmail}
       
         
          />
        );
      else return <MyMedia />;
    }
  }
  const fetchData = async () => {
    var token = localStorage.getItem("token");
    const user = axios
      .get("https://localhost:44350/api/users/userdetails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setData(response.data));
    setFetched(true);
  };





  useEffect(() => {
    fetchData();
  }, [fetched]);

  if (!fetched) {
    return (
      <section style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Spinner animation="grow" />
      </section>
    );
  }

  return (
    <Container  className="w-100 d-flex flex-row justify-content-center mt-3 " >
      <Row className="w-100">
        <Col xs={2} className="d-flex flex-column align-items-center" >
          <Row>
          <Col xs={1}></Col>
          <Col xs={10}>
            <Row style={{padding:'5px',wordWrap:'break-word'}}>
            <h3>My Groups</h3>

            <ButtonGroup vertical className="w-100">

              <Button style={{borderRadius:'10px',}} variant="outline-primary" >G1</Button>
              <br/>
              <Button style={{borderRadius:'10px',}} variant="outline-primary">G2</Button>
              <br/>
              <Button style={{borderRadius:'10px',}} variant="outline-primary">G3</Button>
              <br/>
              <Button style={{borderRadius:'10px',}} variant="outline-primary">G4</Button>
              <br/>
            </ButtonGroup>
            </Row>
          </Col>
          <Col xs={1}></Col>
          
          </Row>
        </Col>
        <Col xs={8} style={{border:'1px solid rgba(13, 110, 253, 0.2)',}}>
          <Row className="m-1">
            <Nav fill variant="tabs" onSelect={profileHandler}>
              <Nav.Item>
                <Nav.Link eventKey="1">Replies</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="2"> Profile </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="3">Media</Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>

          <Row>{renderElement()}</Row>
        </Col>
        <Col xs={2} className=" d-flex flex-column align-items-left" >
          
          <Row >
          <Col xs={1}></Col>
          <Col xs={10}>
          <Row  style={{border:'1px solid #0d6efd',borderRadius:'25px',padding:'5px',wordWrap:'break-word'}}>
          <h4>Hot topics</h4>
          <h5 style={{color:'#0d6efd'}}><a href="#"><b>#</b><i>shk1</i></a></h5>
          <h5 style={{color:'#0d6efd'}}> <a href="#"><b>#</b><i>shk2</i></a></h5>
          <h5 style={{color:'#0d6efd'}}><a href="#"><b>#</b><i>dbProj2021</i></a></h5>
          </Row>
          <br/>
          <Row style={{border:'1px solid #0d6efd',borderRadius:'25px',padding:'5px',wordWrap:'break-word',}}>
          <h4>Suggestions</h4>
          <h5 style={{color:'#0d6efd'}}><b>@</b>bojack</h5>
          <h5 style={{color:'#0d6efd'}}><b>@</b>ricknmorty</h5>
          <h5 style={{color:'#0d6efd'}}><b>@</b>sherlock</h5>
          </Row>
            </Col>
            <Col xs={1}></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
