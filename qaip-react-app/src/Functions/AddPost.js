import React from 'react'
import { useState, useRef, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Image,
  Button,
  Card,
  Form,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";


function AddPost() {
     

    const refTitle=useRef();
    const refDesc=useRef()
    const user = JSON.parse(localStorage.getItem("user"));
    const userID= user.userId;
    function addPost(e){
    
        
        var entTitle= refTitle.current.value;
        var entDesc = refDesc.current.value;
        var id = userID;
        console.log(entTitle+"|"+entDesc+"|"+id)
        Axios.post("https://localhost:44350/api/publicposts",{
            userId:id,
            postName:entTitle,
            postDesc:entDesc,
            photoFileName:""
        }).then((response)=>console.log(response)).catch((error)=>console.log(error));
    }


    return (
        <Form className="border" onSubmit={addPost}>
        <Form.Group controlId="">
          <Form.Label>Question</Form.Label>
          <Form.Control ref={refTitle} type="text" placeholder="Question about SHK1 String methods()..."  />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description:</Form.Label>
          <Form.Control ref={refDesc} as="textarea" rows={3} />
        </Form.Group>
        <br/>
        <Button
          style={{ borderRadius: 15 }}
          variant="outline-info"
          type="submit"
        >
          Add Post
        </Button>
        <br/>
        <br/>
      </Form>
    )
}

export default AddPost
