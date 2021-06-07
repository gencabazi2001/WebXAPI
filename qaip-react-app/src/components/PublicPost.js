import React from 'react';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useState ,useRef} from "react";
import {Modal,Form} from 'react-bootstrap'

function PublicPost(props) {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const idRef = useRef();
    const nameRef = useRef();
    const descRef = useRef();
    const subjRef = useRef();
  

    function editHandler(e){
        e.preventDefault();

        const entIdRef = parseInt(idRef.current.value);
        const entNameRef = nameRef.current.value;
        const entDescRef = descRef.current.value;
        const entSubjRef = parseInt(subjRef.current.value);
    

        axios.put('https://localhost:44350/api/publicposts/'+props.postId,{
            postId:props.postId,
            userId: entIdRef,
            postName: entNameRef,
            postDesc: entDescRef,
            subjectId: entSubjRef,
            photoFileName:""
          
        } )
        .then((res) => console.log(res.data)).then(()=>props.reload());
        handleClose();
    }


    function deleteHandler(id){
        console.log(id);
         fetch('https://localhost:44350/api/publicposts/'+id,{
             method:'DELETE',
             header:{'Accept':'application/json',
            'Content-Type':'application/json'}
         }).then(()=>{
            history.replace('/publicposts')
          }).then(()=>props.reload());
    }
    return (
        <tr>
            <td>{props.postId}</td>
            <td>{props.userId}</td>
            <td>{props.subjectId}</td>
            <td>{props.postName}</td>
            <td>{props.postDesc}</td>
            <td><Button style={{margin:10}} variant="primary"  onClick={handleShow}>Edit</Button >
            <Button  variant="danger" onClick={()=>(deleteHandler(props.postId))}>Delete</Button></td>

            <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add new Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editHandler}>
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
        </tr>
    )
}

export default PublicPost
