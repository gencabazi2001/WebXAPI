import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useState, useRef } from "react";
import { Modal, Form } from 'react-bootstrap'

function PostVote(props) {
    const history = useHistory();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const userRef = useRef();
    const voteRef = useRef();


    function editHandler(e) {
        e.preventDefault();
        const entuserRef = parseInt(userRef.current.value);
        const entvoteRef = voteRef.current.value;
        axios.put("https://localhost:44350/api/PostVotes/" + props.postId, {
            postId: props.postId,
            userId: entuserRef,
            vote: entvoteRef,
        }).then((res) => console.log(res.data)).then(() => props.reload());
        handleClose();
    }

    function deleteHandler(id, userId) {
        console.log(id, userId);

        axios.delete('https://localhost:44350/api/PostVotes/' + id + "/" + userId)
            .then(() => {
                history.replace('/dashboard')
            }).then(() => props.reload());
    }
    return (
        <tr>
            <td>{ props.postId }</td>
            <td>{ props.userId }</td>
            <td>{ props.vote }</td>
            <td><Button style={ { margin: 10 } } variant="primary" onClick={ handleShow }>Edit</Button >
                <Button variant="danger" onClick={ () => (deleteHandler(props.postId, props.userId)) }>Delete</Button></td>



            <Modal show={ show } onHide={ handleClose }>
                <Modal.Header>
                    <Modal.Title>Edit PostVote</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={ editHandler }>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>UserId</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={ props.userId }
                                placeholder="UserId..."
                                ref={ userRef }
                            />
                            <br></br>
                        </Form.Group>

                        <Form.Group controlId="formBasicPosition">
                            <Form.Label>Vote</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Vote..."
                                ref={ voteRef }
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

export default PostVote
