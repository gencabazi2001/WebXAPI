import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useState, useRef } from "react";
import { Modal, Form } from 'react-bootstrap'

function Staff(props) {
    const history = useHistory();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const stafposRef = useRef();

    function editHandler(e) {
        e.preventDefault();
        const entstafposRef = stafposRef.current.value;
        axios.put("https://localhost:44350/api/staffs/" + props.userId, {
            userId: props.userId,
            staffPosition: entstafposRef
        }).then((res) => console.log(res.data)).then(() => props.reload());
        handleClose();
    }

    function deleteHandler(id) {
        console.log(id);

        axios.delete('https://localhost:44350/api/staffs/' + id)
            .then(() => {
                history.replace('/staffs')
            }).then(() => props.reload());
    }
    return (
        <tr>
            <td>{ props.userId }</td>
            <td>{ props.staffPosition }</td>
            <td><Button style={ { margin: 10 } } variant="primary" onClick={ handleShow }>Edit</Button >
                <Button variant="danger" onClick={ () => (deleteHandler(props.subjectId)) }>Delete</Button></td>



            <Modal show={ show } onHide={ handleClose }>
                <Modal.Header>
                    <Modal.Title>Edit Staff</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={ editHandler }>
                        <Form.Group controlId="formBasicPosition">
                            <Form.Label>StaffPosition</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="StaffPosition..."
                                ref={ stafposRef }
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

export default Staff