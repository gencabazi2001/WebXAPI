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

function App() {
  return (
    <Container>
   
      <Switch>
        <Route path="/" exact>
        <NavBar />
          <Users />
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
