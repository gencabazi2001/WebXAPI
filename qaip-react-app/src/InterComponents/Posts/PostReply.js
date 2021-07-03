import {Button, Col, Container, Row,Image } from 'react-bootstrap'
import {PatchCheck,Chat, HandThumbsUp, Share, ThreeDotsVertical, CaretDown, CaretDownFill, CaretUp, CaretUpFill} from 'react-bootstrap-icons'
import './post.css'
import { useState, useRef , useEffect} from 'react'



const PostReply = ( {id, title, text, picture, userName }) => {
    const [UpVoted,setUpVoted] = useState(false);
    const [DownVoted,setDownVoted]= useState(false);
    const [count,setCount] = useState(0);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const changeUp = ()=>{
        if(DownVoted){
            setDownVoted(false);
            setCount(count +1);
        }
        else if(!UpVoted){
        setUpVoted(!UpVoted);
        setCount(count+1);
        }
        else{
            setUpVoted(!UpVoted);
            setCount(count-1)
        }
    }
    const changeDown = ()=>{
        if(UpVoted){
            setUpVoted(false);
            setCount(count -1);
        }
        else if(!DownVoted){
        setDownVoted(!DownVoted);
        setCount(count-1);
        }
        else{
            setDownVoted(!DownVoted);
            setCount(count+1)
        }
    }
    const dropMenu = () =>{
        if(isMenuOpen){
            setMenuOpen(false);
        }
        else{
            setMenuOpen(true);
        }
    }
    const node= useRef();
    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);
      const handleClick = e => {
  if (node.current.contains(e.target)) {
    // inside click
    return;
  }
  // outside click 
  setMenuOpen(false);
};
        return(
       
            <Container   style={{marginTop:'50px',borderLeft:'solid lightgray'}}  >
                <Row>
                    <Col xs={1} style={{display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'center'}} >
                        <div onClick={changeUp}>
                        {UpVoted == true ?<CaretUpFill size={40} /> : <CaretUp size={40} />}
                        </div>
                        
                            <h2>{count}</h2>
                       
                         
                        <div onClick={changeDown}>
                            {DownVoted == true? <CaretDownFill size={40}/>:<CaretDown size={40}/>}
                        </div>
                    </Col >
               
                    <Col xs={1} style={{display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    <PatchCheck size={40} />
                    </Col>
                    <Col xs={10}>
                    <Row style={{ flexWrap:'nowrap'}}>
                    <Col align="left" xs={2}>
                    <Image  style={{width:'70px'}} src="https://i.pinimg.com/236x/e5/fe/e7/e5fee79558b408b9625d954a9ccb9234.jpg" roundedCircle/>
                    <p>@username</p>
                    </Col>
                    <Col style={{marginTop:'40px', textAlign:'left'}} align="center"  xs={8}>
                    {/* <p>Reply to: {replyTo}</p> */}
                    <div className="Comment"> <p>{text}</p></div>
                    </Col>
                    <Col id="dotscontainer" align="center" xs={2}>
                    <ThreeDotsVertical ref={node} id="threedots" onClick={dropMenu} style={{width:'2em', height:'2em', marginTop:'20px'}} />
                    
                    {isMenuOpen?<div className="DropDownMenu" style={{right:(document.getElementById("dotscontainer").clientWidth/2) }}>
                        <div  className="menuItem"><p>Reports</p></div>
                        <div  className="menuItem"><p>Reports</p></div>
                        <div  className="menuItem"><p>Reports</p></div>
                    </div>:<div></div> }
                    <div style={{display:'flex', flexWrap:"wrap"}}><p></p></div>
                    </Col>
                </Row>
                <Row>
                    <Image fluid src={picture}/>
                </Row>
                    </Col>
                </Row>
              
               
                
               
    {console.log("From replies",id, title, text, picture, userName)}
      
            </Container>
        )
    
 
}

export default PostReply