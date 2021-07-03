import React from "react";
//import logo from "./logo.svg";
//import "./App.css";
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
		<div
			style={{
				backgroundImage:
					'url("https://images.unsplash.com/photo-1499937405357-13aa5449e360?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80")',
				position: "fixed",
				minWidth: "100%",
				minHeight: "100%",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div>
				<h1 style={{ textAlign: "center", fontFamily: "Open sans" }}>
					Private Group (Group Name) Posts
				</h1>
				<Container className='w-100 d-flex flex-row justify-content-center mt-3 '>
					<Row className='w-100'>
						<Col
							xs={2}
							className='border d-flex flex-column align-items-center'
						>
							<h3 style={{ fontFamily: "Open sans" }}>Group Members</h3>

							<ButtonGroup vertical className='w-100'>
								<Button variant='success'>Detjon Qoqaj</Button>
								<Button variant='info'>Gent Abazi</Button>
								<Button variant='success'>Genc Abazi</Button>
								<Button variant='info'>Uranik Hodaj</Button>
							</ButtonGroup>
							<Button
								style={{
									flex: 3,
									marginTop: 70,
									marginBottom: "auto",
									maxHeight: 50,
								}}
							>
								Add Members
							</Button>
						</Col>
						<Col xs={8} className='border'>
							<Row className='m-1'></Row>
						</Col>

						<Col
							xs={2}
							className='border d-flex flex-column align-items-center'
						>
							<h3 style={{ fontFamily: "Open sans" }}>Subjects</h3>
							<h5 style={{ fontFamily: "Open sans", alignContent: "center" }}>
								Main Subject
							</h5>

							<ButtonGroup vertical className='w-100'>
								<Button variant='success' size='lg'>
									Lab Course 1
								</Button>
								<h6 style={{ fontFamily: "Open sans", alignContent: "center" }}>
									Other Subjects
								</h6>
								<Button variant='info'>Inxhinieri Softuerike</Button>
								<Button variant='success' size='sm'>
									Hyrje Ne Siguri Te Informacionit
								</Button>
								<Button variant='info' size='sm'>
									Struktura Diskrete 2
								</Button>
								<Button variant='success' size='sm'>
									Sisteme Operative
								</Button>
								<Button variant='info' size='sm'>
									Sisteme dhe Sinjale
								</Button>
								<Button variant='success' size='sm'>
									HCI
								</Button>
							</ButtonGroup>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
}

export default Feed
