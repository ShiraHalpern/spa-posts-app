import "./App.css";
import React from "react";
import Users from "./components/Users";
import UserPosts from "./components/UserPosts";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Users} />
          <Route path="/:id" component={UserPosts} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
