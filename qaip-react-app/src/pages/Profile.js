import React from 'react'
import { Col, Container ,Row} from 'react-bootstrap'

import "bootstrap/dist/css/bootstrap.min.css";

function Profile() {
    return (
       <Container  className="h-100 d-flex justify-content-center">
           <Col className="border p-2">
            <h3>SHK2</h3>
            <h3>SHK2</h3>
            <h3>SHK2</h3>
            <h3>SHK2</h3>
            <h3>SHK2</h3>
           </Col>
           <Col xs={10} >
               <Row  className="m-auto" >
            
               <Col  className="border">  <h1>My Posts</h1>
               </Col>
               <Col  className="border">  <h1>Profile Pic</h1>
               </Col>
               <Col  className="border">  <h1>Media</h1>
               </Col>
               </Row>
               <Row  >
               <h1>Bio and stuff</h1>
               <h3>edit profile</h3>
               <hr></hr>
               </Row>
               <Row  >
            
               <h1>Posts vvvv</h1>
               <h1>Posts vvvv</h1>
               <h1>Posts vvvv</h1>
               <h1>Posts vvvv</h1>
               <h1>Posts vvvv</h1>
               <h1>Posts vvvv</h1>
               <h1>Posts vvvv</h1>
               <h1>Posts vvvv</h1>
               <h1>Posts vvvv</h1>
               <h1>Posts vvvv</h1>
             
            </Row>
               


           </Col>
           <Col className="border p-2">
               <h4>#shk1</h4>
               <h4>#shk2</h4>
               <h4>#dbProj2021</h4>
           </Col>
           <br></br>
       </Container>
    )
}

export default Profile
