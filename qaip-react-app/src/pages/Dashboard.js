import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { ListGroup } from 'react-bootstrap'
import { useHistory } from 'react-router';
import Users from './Users'
import Subjects from './Subjects'
import PublicPosts from './PublicPosts'
import PGroups from './PGroups'
import GroupMembers from './GroupMembers'
import Departments from './Departments'
import Staffs from './Staffs'
import PostVotes from './PostVotes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './dashboard.css'
import Navbar from '../components/NavBar/NavBar'
import Ankesat from './Ankesat';

function Dashboard() {
    const history = useHistory();
    const [tableTab, setTableTab] = useState(1);

    function tableHandler(e) {
        setTableTab(e);
        console.log(tableTab);
    }

    function renderTables() {
        if (tableTab === 1)
            return <Users />;
        else if (tableTab === 2)
            return <Subjects />;
        else if (tableTab === 3)
            return <PublicPosts />;
        else if (tableTab === 4)
            return <PGroups />;
        else if (tableTab === 5)
            return <GroupMembers />;
        else if (tableTab === 6)
            return <Departments />;
        else if (tableTab === 7)
            return <Staffs />;
        else if (tableTab === 9)
            return <PostVotes />;

        else if (tableTab === 8)
            return <Ankesat />;
    }

    return (
        <div>

            <Container fluid className="w-100 h-100 d-flex flex-row" style={ { height: "100vh" } }>
                <Row className="w-100">
                    <Col xs={ 2 } className="d-flex flex-column align-items-center bg-dark">
                        <h4 className='admin-text'>Admin Dashboard</h4>
                        <ListGroup variant="flush" className='ml-3'>
                            <ListGroup.Item className='items' onClick={ () => { tableHandler(1) } } >
                                <Link className='links'>
                                    Users
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item className='items' onClick={ () => { tableHandler(2) } }>
                                <Link className='links'>
                                    Subjects
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item className='items' onClick={ () => { tableHandler(3) } }>
                                <Link className='links'>
                                    Public Posts
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item className='items' onClick={ () => { tableHandler(4) } }>
                                <Link className='links'>
                                    Private Groups
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item className='items' onClick={ () => { tableHandler(5) } }>
                                <Link className='links'>
                                    Group Members
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item className='items' onClick={ () => { tableHandler(6) } }>
                                <Link className='links'>
                                    Departments
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item className='items' onClick={ () => { tableHandler(7) } }>
                                <Link className='links'>
                                    Staffs
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item className='items' onClick={ () => { tableHandler(9) } }>
                                <Link className='links'>
                                    PostVotes
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item className='items' onClick={ () => { tableHandler(8) } }>
                                <Link className='links'>
                                    Contact Us
                                </Link>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col xs={ 10 }>
                        { renderTables() }
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default Dashboard
