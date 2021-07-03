
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
import AddPost from "../Functions/AddPost";

function Group() {
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
								<Button variant='info'>Detjon Qoqaj</Button>
								<Button variant='dark'>Gent Abazi</Button>
								<Button variant='info'>Genc Abazi</Button>
								<Button variant='dark'>Uranik Hodaj</Button>
							</ButtonGroup>
							<Button className='w-100 mt-5'>Add Member</Button>
						</Col>
						<Col xs={8} className='border'>
							<Row className='m-1'>
						<AddPost/>
							</Row>
						</Col>

						<Col
							xs={2}
							className='border d-flex flex-column align-items-center'
						>
							<h3 style={{ fontFamily: "Open sans" }}>Subjects</h3>

							<ButtonGroup vertical className='w-100'>
								<Button variant='info' size='lg'>
									Lab Course 1
								</Button>
								<Button variant='dark' size='sm'>
									Inxhinieri Softuerike
								</Button>
								<Button variant='info'>
									Hyrje Ne Siguri Te Informacionit
								</Button>
								<Button variant='dark'>Struktura Diskrete 2</Button>
								<Button variant='info'>Sisteme Operative</Button>
								<Button variant='dark'>Sisteme dhe Sinjale</Button>
								<Button variant='info'>HCI</Button>
							</ButtonGroup>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
}

export default Group;
