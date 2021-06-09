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
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <Container fluid style={{padding:"0px", margin:"0px"}}>
   
      <Switch>
        <Route path="/" exact>
        <NavBar />
          <Home />
        </Route>
        <Route path="/profile" exact>
        <NavBar />
          <Profile />
        </Route>
        <Route path="/users" exact>
        <NavBar />
          <Users />
        </Route>
        <Route path="/main" exact>
          <Main />
        </Route>
        <Route path="/subjects">
        <NavBar />
          <Subjects />
        </Route>
        <Route path="/publicposts">
        <NavBar />
          <PublicPosts />
        </Route>
        <Route path="/pgroups">
        <NavBar />
          <PGroups />
        </Route>
        <Route path="/groupmembers">
        <NavBar />
          <GroupMembers />
        </Route>
        <Route path="/departments">
        <NavBar />
          <Departments />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
