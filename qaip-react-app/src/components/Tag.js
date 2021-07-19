import React from 'react';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useState ,useRef} from "react";
import {Modal,Form} from 'react-bootstrap'
function Tag(props) {



    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    function deleteHandler(id){
        console.log(id);
         axios.delete('https://localhost:44350/api/Tags/'+id,{
         
         }).then(()=>{
            history.replace('/dashboard');
           
          }).then(()=>{
            props.reloadTags();
          });
    }
    return (
        <tr>
            <td>{props.tagName}</td>
            <td>
                <Button  variant="danger" onClick={()=>{deleteHandler(props.tagName); }}>Delete</Button>
            </td>
        </tr>
    )
}

export default Tag
