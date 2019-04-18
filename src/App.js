import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import CreateTodo from './CreateTodo';
import UpdateTodo from './UpdateTodo';
import Login from './Login';
import Signup from './Signup';
import Todos from './Todos';
import Todo from './Todo';

function App() {
  // window.localStorage.setItem('token', '11');
  // window.localStorage.removeItem('token');
  return (
    <Router>
      <>
        <Route exact path="/" component={Todos} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/createTodo" component={CreateTodo} />
        <Route exact path="/updateTodo/:id" component={UpdateTodo} />
        <Route exact path="/todos/:id" component={Todo} />
        {/* <Route component={Login}/> */}
      </>
    </Router>
  );
}

export default App;
