import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import { useState, useEffect } from "react";
import { Form, Col, Container, Row, Button, Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import './contactUs.css';
import { useRef } from "react";
import Axios from "axios";



function Dashboard() {

    const [userData, setData] = useState({});

    const descriptionRef = useRef();
    var userToken = JSON.parse(localStorage.getItem("user"));

    function contactUsHandler(event){

        console.log(userToken.userId);
        const entDescRef = descriptionRef.current.value;
        Axios.post("https://localhost:44350/api/Ankesat", {
            userId: userToken.userId,
            description: entDescRef
        })
    }


    
   

    return (
        <div>
        <Container fluid style={{height: "97vh"}} className="contUsContainer">
            <Row className="w-100 h-100">
                <Col></Col>
                <Col>
                    <Row className="h-25"></Row>
                    <Row className="h-25">
                        <Form onSubmit={contactUsHandler}>
                            <Form.Group>
                                <h2 className="h1Label">Contact Us</h2>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Describe your problem</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="text"
                                    placeholder="Enter issue description"
                                    className="textArea"
                                    ref={descriptionRef}
                                />
                            </Form.Group>
                            <Form.Group className="btnGroup">
                                <Button  variant="primary" type="submit" className="Submitbtn">
                                    Send
                                </Button>
                            </Form.Group>
                        </Form>
                    </Row>
                    <Row className="h-25"></Row>
                    <Row className="h-25"></Row>
                </Col>
                <Col></Col>
            </Row>
        </Container>
        </div>

    )
}

export default Dashboard
