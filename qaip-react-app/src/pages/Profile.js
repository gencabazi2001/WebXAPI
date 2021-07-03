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
import { useState, useEffect } from "react";
import axios from "axios";
function Profile() {
  const [ProfileTab, setProfileTab] = useState(2);
  const [userData, setData] = useState({});
  const [fetched, setFetched] = useState(false);

 
  function profileHandler(e) {
    setProfileTab(e);
  }

   function renderElement() {
    while (!(userData.userDepartmentNavigation === undefined)) {
      var js = JSON.stringify(userData);
      localStorage.setItem("user", js);
      console.log(userData);
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
    <Container className="w-100 d-flex flex-row justify-content-center mt-3 ">
      <Row className="w-100">
        <Col xs={2} className="border d-flex flex-column align-items-center">
          <h3>My Groups</h3>

          <ButtonGroup vertical className="w-100">
            <Button variant="info">G1</Button>
            <Button>G2</Button>
            <Button variant="danger">G3</Button>
            <Button variant="info">G4</Button>
          </ButtonGroup>
        </Col>
        <Col xs={8} className="border">
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
        <Col xs={2} className="border d-flex flex-column align-items-center">
          <h3>Hot topics!</h3>
          <h4>#shk1</h4>
          <h4>#shk2</h4>
          <h4>#dbProj2021</h4>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
