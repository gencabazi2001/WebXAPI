import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Users from "./pages/Users";
import Departments from "./pages/Departments";
import GroupMembers from "./pages/GroupMembers";
import PGroups from "./pages/PGroups";
import Subjects from "./pages/Subjects";
import Main from "./pages/Main";
import PublicPosts from "./pages/PublicPosts";
import NavBar from "../src/components/NavBar/NavBar";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import Footer from "./components/NavBar/Footer";
import ProtectedRoute from "./ProtectedRoute";
import Post from './InterComponents/Posts/Post';
import MyProfile from "./InterComponents/MyProfile";
import MyMedia from "./InterComponents/MyMedia";
import Feed from './PostFeed/Feed'
import Dashboard from "./pages/Dashboard";
import Group from './PostFeed/Group'
import Home from './pages/index';


function App() {
  return (
    <Container fluid style={{padding:"0px", margin:"0px"}}>
          
      <Switch>
     
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/landingpage" exact>
          <LandingPage/>
        </Route>
        <ProtectedRoute path="/profile" exact component={Profile} navbar={NavBar}/>
        <ProtectedRoute path="/feed" exact component={Feed} navbar={NavBar}/>
        <ProtectedRoute path="/users" exact component={ Users } navbar={NavBar}/>
        <ProtectedRoute path="/main" exact component={Main} navbar={NavBar}/>
        <ProtectedRoute path="/subjects" exact component={Subjects} navbar={NavBar}/>
        <ProtectedRoute path="/publicposts" exact component={PublicPosts} navbar={NavBar}/>
        <ProtectedRoute path="/privategroups" exact component={Group} navbar={NavBar}/>
        <ProtectedRoute path="/groupmembers" exact component={GroupMembers} navbar={NavBar}/>
        <ProtectedRoute path="/departments" exact component={Departments} navbar={NavBar}/>
        <Route path="/post"exact>
          <Post/>
        </Route>
        <Route path ="/dashboard" exact>
          <Dashboard/>
        </Route>
      </Switch>
        
     
          <Footer/>
    </Container>
  );
}

export default App;
