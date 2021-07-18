import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Staff from "../components/Staff";
import { useRef } from "react";
import React from 'react'
import axios from 'axios'

function Staffs() {
    const [isLoading, setISLoading] = useState(false);

    const [refreshKey, setRefreshKey] = useState(0);
    const [loadUsers, setLoadUsers] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function reload() {
        setRefreshKey(oldKey => oldKey + 1);
    }
    const useridRef = useRef();
    const stafposRef = useRef();
    function submitHandler(event) {
        event.preventDefault();
        const entuseridRef = parseInt(useridRef.current.value);
        const entstafposRef = stafposRef.current.value;
        axios.post("https://localhost:44350/api/Staffs", {
            userId: entuseridRef,
            staffPosition: entstafposRef,
        }).then(() => setRefreshKey(oldKey => oldKey + 1));
        handleClose();

    }

    useEffect(() => {
        setISLoading(true);
        fetch("https://localhost:44350/api/Staffs")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const users = [];
                for (const key in data) {
                    const user = {
                        id: key,
                        ...data[key],
                    };
                    console.log(user);
                    users.push(user);
                }
                setISLoading(false);
                setLoadUsers(users);
                console.log(users)
            });
    }, [refreshKey]);
    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }
    return (
        <div className="border">
            <Table>
                <thead>
                    <tr>
                        <th>StaffId</th>
                        <th>StaffPosition</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { loadUsers.map((user) => (
                        <Staff
                            key={ user.id }
                            userId={ user.userId }
                            staffPosition={ user.staffPosition }
                            reload={ reload }
                        />
                    )) }
                </tbody>
            </Table>

            <Button variant="info" onClick={ handleShow }>
                Add+
            </Button>

            <Modal show={ show } onHide={ handleClose }>
                <Modal.Header>
                    <Modal.Title>Add a new Staff</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={ submitHandler }>
                        <Form.Group controlId="formBasicPosition">
                            <Form.Label>StaffId</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="StaffId..."
                                ref={ useridRef }
                            />
                            <br></br>
                        </Form.Group>

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

        </div>
    )
}

export default Staffs
