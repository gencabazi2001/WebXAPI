import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import PostVote from "../components/PostVote";
import { useRef } from "react";
import React from 'react'
import axios from 'axios'

function PostVotes() {
    const [isLoading, setISLoading] = useState(false);

    const [refreshKey, setRefreshKey] = useState(0);
    const [loadUsers, setLoadUsers] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function reload() {
        setRefreshKey(oldKey => oldKey + 1);
    }
    const postidRef = useRef();
    const useridRef = useRef();
    const voteRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        const entpostidRef = parseInt(postidRef.current.value);
        const entuseridRef = parseInt(useridRef.current.value);
        const entvoteRef = voteRef.current.value;

        axios.post("https://localhost:44350/api/PostVotes", {
            postId: entpostidRef,
            userId: entuseridRef,
            vote: entvoteRef
        }).then(() => setRefreshKey(oldKey => oldKey + 1));
        handleClose();

    }

    useEffect(() => {
        setISLoading(true);
        fetch("https://localhost:44350/api/PostVotes")
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
                        <th>PostId</th>
                        <th>UserId</th>
                        <th>Vote</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { loadUsers.map((user) => (
                        <PostVote
                            key={ user.id }
                            postId={ user.postId }
                            userId={ user.userId }
                            vote={ user.vote }
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
                    <Modal.Title>Add a new PostVote</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={ submitHandler }>
                        <Form.Group controlId="formBasicPosition">
                            <Form.Label>PostId</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="PostId..."
                                ref={ postidRef }
                            />
                            <br></br>
                        </Form.Group>

                        <Form.Group controlId="formBasicPosition">
                            <Form.Label>UserId</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="UserId..."
                                ref={ useridRef }
                            />
                            <br></br>
                        </Form.Group>
                        <Form.Group controlId="formBasicDesc">
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

        </div>
    )
}

export default PostVotes
