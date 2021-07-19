import { Table, Button, Modal, Form, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Tag from '../components/Tag';
import { useRef } from "react";
import Axios from "axios";

function Tags(props) {
    
  const [isLoading, setISLoading] = useState(false);

  const [loadTags, setLoadTags] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const tagNameRef = useRef();

  function reloadTags(){
    setRefreshKey(oldKey => oldKey +1);
  }
 

  function submitHandler(event) {
    event.preventDefault();
    const entTagNameRef = tagNameRef.current.value;

    Axios.post("https://localhost:44350/api/Tags", {
        tagName: entTagNameRef
      
    }).then(() => setRefreshKey(oldKey => oldKey +1));
    handleClose();
  }


  useEffect(() => {
   
    setISLoading(true);
    fetch("https://localhost:44350/api/Tags")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const tags = [];
        for (const key in data) {
          const tag = {
            id: key,
            ...data[key],
          };
          console.log(tag);
          tags.push(tag);
        }
        setISLoading(false);
        setLoadTags(tags);
      });
  }, [refreshKey]);

  if (isLoading) {
    return (
      <section style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Spinner animation="grow" />
      </section>
    );
   

  }
  else{
  return (
    <div className="border">
      <Table>
        <thead>
          <tr>
            <th>Tag Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loadTags.map((tag) => (
            <Tag 
              key={tag.tagName}
              tagName={tag.tagName}
              reloadTags={reloadTags}
            />
          ))}
        </tbody>
      </Table>

      <Button variant="info" onClick={handleShow}>
        Add+
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add a new Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="forID">
              <Form.Label>Tag Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter userID"
                ref={tagNameRef}
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
  );
    
}
}

export default Tags;
