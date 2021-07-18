import { Button, Col, Container, Row, Image } from "react-bootstrap";
import {
  PatchCheck,
  Chat,
  HandThumbsUp,
  Share,
  ThreeDotsVertical,
  CaretDown,
  CaretDownFill,
  CaretUp,
  CaretUpFill,
} from "react-bootstrap-icons";
import "./post.css";
import { useState, useRef, useEffect } from "react";
import PostReply from "./PostReply";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

const Post = ({ id, title, text, picture, time, userName }) => {
  const [replies, setReplies] = useState([]);
  const [replied, setReplied] = useState([]);
  const [fetched, setFetched] = useState(false);
  var repl = [];
  var d = [];

  const getReplies = async () => {
    const res = await axios
      .get("https://localhost:44350/api/publicposts/replyTo/" + id)
      .then((response) => {
        d = response.data;
        //   console.log(JSON.stringify(d)+"asdasdasd");
        setReplies(d);
      })
      .catch((error) => console.log(error));
    setReplies(res);
  //  setFetched(true);
  };

  function renderReplies() {
    if (!(replies === undefined || replies.length === 0)) {
      console.log(JSON.stringify(replies) + "asd");
      repl = JSON.parse(JSON.stringify(replies));
    }
  }

  useEffect(() => {
    getReplies();
    
  }, []);

  function picHandler() {
    var pic = picture;
    if (pic.length > 6) {
      return "https://localhost:44350/" + pic;
    } else
      return "https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg";
  }
  const [UpVoted, setUpVoted] = useState(false);
  const [DownVoted, setDownVoted] = useState(false);
  const [count, setCount] = useState(0);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const changeUp = () => {
    if (DownVoted) {
      setDownVoted(false);
      setCount(count + 1);
    } else if (!UpVoted) {
      setUpVoted(!UpVoted);
      setCount(count + 1);
    } else {
      setUpVoted(!UpVoted);
      setCount(count - 1);
    }
  };
  const changeDown = () => {
    if (UpVoted) {
      setUpVoted(false);
      setCount(count - 1);
    } else if (!DownVoted) {
      setDownVoted(!DownVoted);
      setCount(count - 1);
    } else {
      setDownVoted(!DownVoted);
      setCount(count + 1);
    }
  };
  const dropMenu = () => {
    if (isMenuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  };
  const node = useRef();
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setMenuOpen(false);
  };

  //https://localhost:44350/api/publicposts/replyTo/25
  return (
    <Container
      style={{ marginTop: "50px" }}
      className="block-example border border-info rounded p-2"
    >
      <Row>
      
        <Col
          xs={1}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div onClick={changeUp}>
            {UpVoted == true ? (
              <CaretUpFill size={30} />
            ) : (
              <CaretUp size={30} />
            )}
          </div>

          <h2>{count}</h2>

          <div onClick={changeDown}>
            {DownVoted == true ? (
              <CaretDownFill size={30} />
            ) : (
              <CaretDown size={30} />
            )}
          </div>
        </Col>
        <Col
          xs={1}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <PatchCheck size={20} />
        </Col>
        <Col xs={10}>
          <Row style={{ flexWrap: "nowrap" }}>
            <Col align="left" xs={2}>
              <Image
                style={{ width: "60px", height: "60px" }}
                src={picHandler()}
                roundedCircle
              />
              <p>@{userName}</p>
            </Col>
            <Col style={{ marginTop: "40px" }} align="center" xs={8}>
              <h4>{title}</h4>
              <p>{text}</p>
            </Col>
            <Col id="dotscontainer" align="center" xs={2}>
              <ThreeDotsVertical
                ref={node}
                id="threedots"
                onClick={dropMenu}
                style={{ width: "1.5em", height: "1.5em", marginTop: "20px" }}
              />

              {isMenuOpen ? (
                <div
                  className="DropDownMenu"
                  style={{
                    right:
                      document.getElementById("dotscontainer").clientWidth / 2,
                  }}
                >
                  <div className="menuItem">
                    <p>Reports</p>
                  </div>
                  <div className="menuItem">
                    <p>Reports</p>
                  </div>
                  <div className="menuItem">
                    <p>Reports</p>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <p>{time}</p>
              </div>
            </Col>
          </Row>

          <Row>{/* <Image fluid src={picture} /> */}</Row>
        </Col>
        <Container fluid>
          <Row>
            <Col xs={2}>
         
            </Col>
            <Col xs={10}>
            {renderReplies()}
           { console.log(repl.length+title)}
                  {/* {(repl.length!=0)?<h1>{JSON.stringify(repl)}asd</h1>:<h1>spo bon</h1>} */}
               
           
               {/* {repl.map((post)=>(
                 <h1 key={post.postId}>{post.postId}</h1>
               ))} */}
              {/* { repl.map((post) =>  (
               
                  <PostReply
                    key={post.postId}
                    id={post.postId}
                    text={post.postDesc}
                    userName={userName}
                    title={post.postName}
                    picture={picture}
                  />
                ))
              
              } */}
             
              {/* <Button
                style={{ marginTop: "20px", width: "100%" }}
                variant="outline-primary"
              >
                View all replies
              </Button> */}
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default Post;
