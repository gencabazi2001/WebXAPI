import React from 'react';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useState ,useRef} from "react";
import {Modal,Form} from 'react-bootstrap'

function GroupMember(props) {  
     const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   
    const userIDRef = useRef();
    const DOJRef = useRef();

    function editHandler(event) {
        event.preventDefault();
       
        const entUIDRef = parseInt(userIDRef.current.value);
        const entDOJRef = DOJRef.current.value;
      
       axios.put("https://localhost:44350/api/groupmembers/"+props.subjectId,
        {
          subjectId: props.subjectId,
          userId: entUIDRef,
          dateOfJoining: entDOJRef
        }).then((res) => console.log(res.data)).then(()=>props.reload());
        handleClose();
    }

    function deleteHandler(id){
        console.log(id);
         fetch('https://localhost:44350/api/groupmembers/'+id,{
             method:'DELETE',
             header:{'Accept':'application/json',
            'Content-Type':'application/json'}
         }).then(()=>{
            history.replace('/groupmembers')
          }).then(()=>props.reload());
    }
    return (
        <tr>
            <td>{props.subjectId}</td>
            <td>{props.userId}</td>
            <td>{props.dateOfJoining}</td>
            
            <td><Button style={{margin:10}} variant="primary" onClick={handleShow}>Edit</Button >
            <Button  variant="danger" onClick={()=>(deleteHandler(props.subjectId))}>Delete</Button></td>

            <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Edit Group Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={editHandler}>
           
              <Form.Group controlId="forName">
                <Form.Label>UserID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="User ID"
                  ref={userIDRef}
                />
                <br></br>
              </Form.Group>
              <Form.Group controlId="forLastName">
                <Form.Label>Date Of Joining</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="yyyy-mm-dd"
                  ref={DOJRef}
                />
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

export default GroupMember
