import React from "react";
import { Col, Container, Row,Image, Button,Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function MyProfile(props) {
  
  return (
    <Container>
     
      <Row className="d-flex justify-content-center border-bottom">
        <Row  className=""> 
        <Col className="border-bottom"></Col>
        <Col className="d-flex justify-content-center"><Image style={{height:100,width:100}} src="https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" roundedCircle></Image>
         </Col>
        <Col className="border-bottom"></Col>
      
         </Row>
    
        <Row>
            <h5 className="text-muted">Name:  {props.name} {props.lname}  </h5>
        </Row>
        <Row>
            <h5  className="text-muted">Department: {props.department} </h5>
        </Row>
        <Row>
            <Col> <h5  className="text-muted">UpVotes: </h5></Col>
            <Col> <h5  className="text-muted">DownVotes: </h5></Col>
            <Col></Col>
            <Col className="d-flex flex-row justify-content-end">  <Button style={{borderRadius:15}} variant="outline-info">Edit Profile</Button></Col>
        </Row>
        <Row>
            <h6  className="text-muted">Year: </h6>
        </Row>
      </Row>
      <Row>
          <Col className=''>
        
          </Col>
          <Col className=''>
        
        </Col>
          <Col  className=''>
          </Col>
          <Col className='' >
              <Row>
         
          </Row>
          </Col>
          
      
       
      </Row>
      <Row>
         
          <Col>
          </Col>
          <Col xs={10} className="mt-2 mb-2">
          <Card border="info" >
          <Card.Body>
           <Card.Title>Titulli</Card.Title>
          <Card.Text> Some Text</Card.Text>
              
           </Card.Body>
       </Card>
       <hr></hr>
       <Card border="info" >
          <Card.Body>
           <Card.Title>Titulli</Card.Title>
          <Card.Text> Some Text</Card.Text>
              
           </Card.Body>
       </Card>
          </Col>
          <Col >
          </Col>
     
      </Row>
    </Container>
  );
}

export default MyProfile;
