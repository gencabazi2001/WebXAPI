import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import CarouselHome from '../components/CarouselHome'

const Home = () => {
    return (
        <Container fluid style={{padding:"0px", overflowX:"hidden"}}>
            <Row>
                <Col xs={12}>
            <CarouselHome
                src1="https://i.pinimg.com/originals/70/e8/b2/70e8b246527f88131a5ea00ac3eced84.jpg"
                src2="https://i.pinimg.com/originals/eb/49/e5/eb49e5a5ab67740df2b5bed8ddb153de.jpg"
                src3="https://cdn.wallpapersafari.com/19/32/EUSrO2.jpg"
                h31="First Slide"
                h32="Second Slide"
                h33="Third Slide"
                p1="Follow us on Facebook"
                p2="Follow us on Twitter"
                p3="Follow us on Instagram"
                btxt1="Action 1"
                btxt2="Action 2"
                btxt3="Action 3"
                bhref1="https://facebook.com"
                bhref2="https://twitter.com"
                bhref3="https://instagram.com"

            />
            </Col>
            </Row>
                <Row>
                    <Col>
                        <Card
                            bg="dark"
                            text="light"
                            style={{ width: '18rem' }}
                            className="mb-2"
                        >
                            <Card.Header>Header</Card.Header>
                            <Card.Body>
                                <Card.Title>Card Title </Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                    <Card
                            bg="dark"
                            text="light"
                            style={{ width: '18rem' }}
                            className="mb-2"
                        >
                            <Card.Header>Header</Card.Header>
                            <Card.Body>
                                <Card.Title>Card Title </Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                    <Card
                            bg="dark"
                            text="light"
                            style={{ width: '18rem' }}
                            className="mb-2"
                        >
                            <Card.Header>Header</Card.Header>
                            <Card.Body>
                                <Card.Title>Card Title </Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

        </Container>
    )
}

export default Home
