import React from 'react';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useState ,useRef} from "react";
import {Modal,Form} from 'react-bootstrap'
function TagPost(props) {



    const history = useHistory();


    
    function deleteHandler(id, postId){
        console.log(id);
         axios.delete('https://localhost:44350/api/TagsPosts/'+id+'/'+postId)
         .then(()=>{
            history.replace('/dashboard');
           
          }).then(()=>{
            props.reloadTags();
          });
    }
    return (
        <tr>
            <td>{props.tagName}</td>
            <td>{props.postId}</td>
            <td>
                <Button  variant="danger" onClick={()=>{deleteHandler(props.tagName, props.postId); }}>Delete</Button>
            </td>
        </tr>
    )
}

export default TagPost
