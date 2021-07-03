import { useState, useRef, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Image,
  Button,
  Card,
  Form,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Post from "./Posts/Post";
import AddPost from "../Functions/AddPost";
function MyProfile(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPic, setShowPic] = useState(false);
  const handlePClose = () => setShowPic(false);
  const handlePShow = () => setShowPic(true);
  const [uploadFile, setUploadFile] = useState();

  const nameRef = useRef();

  function editHandler(e) {
    const entNameRef = nameRef.current.value;
    console.log(
      entNameRef,
      props.id,
      props.name,
      props.name,
      props.lname,
      entNameRef,
      props.email,
      props.pass,
      props.pic,
      props.depId
    );
    Axios.put("https://localhost:44350/api/users/" + props.id, {
      userId: props.id,
      userFirstNAme: props.name,
      userLastName: props.lname,
      userDescription: entNameRef,
      userEmail: props.email,
      userPassword: props.pass,
      userPhotoFileName: props.pic,
      userDepartment: props.depId,
      userRole: "",
    });
    handleClose();
  }

  function editImage(e) {
    console.log(uploadFile[0]);
    var entImageRef = new FormData();
    entImageRef.append("file", uploadFile[0]);
    Axios.post(
      "https://localhost:44350/api/users/profilepic/" + props.id,
      entImageRef
    ).catch((error) => console.log(error));
  }

  function picHandler() {
    var picture = props.pic;
    if (picture.length > 6) {
      return "https://localhost:44350/" + props.pic;
    } else
      return "https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg";
  }

  var user = JSON.parse(localStorage.getItem("user"));
  var myPosts = user.publicPosts;
  
  myPosts.sort(function(a,b){
    return b.postId-a.postId
  })
  console.log(myPosts);

  return (
    <Container>
      <Row className="d-flex justify-content-center border-bottom">
        <Row className="">
          <Col className="border-bottom"></Col>
          <Col className="d-flex justify-content-center ">
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="button-tooltip-2">Edit Profile Picture</Tooltip>
              }
            >
              <Image
                onClick={handlePShow}
                style={{ height: 100, width: 100 }}
                src={picHandler()}
                roundedCircle
              ></Image>
            </OverlayTrigger>
          </Col>
          <Col className="border-bottom"></Col>
        </Row>

        <Row>
          <h6 className="text-muted">
            Name: {props.name} {props.lname}{" "}
          </h6>
        </Row>
        <Row>
          <h6 className="text-muted">Department: {props.department} </h6>
        </Row>
        <Row>
          <Col>
            {" "}
            <h6 className="text-muted">UpVotes: </h6>
          </Col>
          <Col>
            {" "}
            <h6 className="text-muted">DownVotes: </h6>
          </Col>
          <Col></Col>
          <Col className="d-flex flex-row justify-content-end">
            {" "}
            <Button
              style={{ borderRadius: 15 }}
              variant="outline-info"
              onClick={handleShow}
            >
              Edit Profile
            </Button>
          </Col>
        </Row>

        <Row>{props.bio && <h5>{props.bio}</h5>}</Row>
        <Row></Row>
      </Row>
      <Row>
        <Col className=""></Col>
        <Col className=""></Col>
        <Col className=""></Col>
        <Col className="">
          <Row></Row>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={10} className="mt-2 mb-2">
          <Row>
          <AddPost/>
          </Row>

          {/* <Card border="info">
            <Card.Body>
              <Card.Title>Titulli</Card.Title>
              <Card.Text> Some Text</Card.Text>
            </Card.Body>
          </Card> */}

          { myPosts.map((post) => (
            post.replyTo==null&&
            <Post
              key={post.postId}
              id={post.postId}
              text={post.postDesc}
              userName={user.userFirstName}
              title={post.postName}
              picture={user.userPhotoFileName}
            />
          ))
         
         }

          {/* <Card border="info">
            <Card.Body>
              <Card.Title>Titulli</Card.Title>
              <Card.Text> Some Text</Card.Text>
            </Card.Body>
          </Card> */}
        </Col>
        <Col></Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editHandler}>
            <Form.Group controlId="forBio">
              <Form.Label>Edit Bio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter bio"
                defaultValue={props.bio}
                ref={nameRef}
              />
              <br></br>
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showPic} onHide={handlePClose}>
        <Modal.Header>
          <Modal.Title>Edit Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editImage}>
            <Form.Group controlId="forBio">
              {/* <Form.File  ref={imageRef} id="exampleFormControlFile1"  /> */}

              <input
                onChange={(e) => setUploadFile(e.target.files)}
                type="file"
                name="profilePic"
              />
              <br></br>
            </Form.Group>
            <br />
            <Button variant="primary" type="submit" onClick={handlePClose}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default MyProfile;
