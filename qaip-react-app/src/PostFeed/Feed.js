import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
	Col,
	Container,
	Row,
	Nav,
	ButtonGroup,
	Button,
	Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Feed() {
	return (
		<div>
			<h1 style={{ textAlign: "center", fontFamily: "Open sans" }}>
				Feed Posts
			</h1>
			<Container className='w-100 d-flex flex-row justify-content-center mt-3 '>
				<Row className='w-100'>
					<Col xs={2} className='border d-flex flex-column align-items-center'>
						<h3 style={{ fontFamily: "Open sans" }}>My Groups</h3>

						<ButtonGroup vertical className='w-100'>
							<Button variant='info'>G1</Button>
							<Button variant='dark'>G2</Button>
							<Button variant='info'>G3</Button>
							<Button variant='dark'>G4</Button>
						</ButtonGroup>
					</Col>
					<Col xs={8} className='border'>
						<Row className='m-1'></Row>
					</Col>

					<Col xs={2} className='border d-flex flex-column align-items-center'>
						<h3 style={{ fontFamily: "Open sans" }}>Subjects</h3>

						<ButtonGroup vertical className='w-100'>
							<Button variant='info'>Lab Course 1</Button>
							<Button variant='dark'>Inxhinieri Softuerike</Button>
							<Button variant='info'>Hyrje Ne Siguri Te Informacionit</Button>
							<Button variant='dark'>Struktura Diskrete 2</Button>
							<Button variant='info'>Sisteme Operative</Button>
							<Button variant='dark'>Sisteme dhe Sinjale</Button>
							<Button variant='info'>HCI</Button>
						</ButtonGroup>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Feed;

