import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import styled from 'styled-components';

import { checkLogin } from './common/checkLogin'

const URL = process.env.REACT_APP_URL;

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

class Todos extends Component {
  constructor(props) {
    super(props);
    const token = checkLogin();
    this.state = {
      todoList: [],
      token,
      redirect: false,
    }
  }

  async componentDidMount() {
    const result = await axios.get(`${URL}/todos`, {
      headers: {
        Authorization: 'Bearer ' + this.state.token //the token is a variable which holds the token
      }
    });
    if(result.status === 200 && result.data.ok === true) {
      this.setState({
        todoList: result.data.result,
      })
    } else {
      console.log(result.data.error);
    }
  }
  
  render() {
    if(!this.state.token) {
      this.props.history.push('/login');
    }
    const { todoList } = this.state;
    return (
      <Box>
        <h1>지금부터 웹을 만들어 보겠습니다.</h1>
        <div>할일이 {todoList.length}개 있습니다.</div>
        <Link to="createTodo">추가</Link>
        <table border={1}>
          <thead>
            <tr>
              <th>title</th>
              <th>content</th>
              <th>check</th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td onClick={() => this.props.history.push(`/todos/${todo.id}`)}>{todo.title}</td>
                  <td>{todo.content}</td>
                  <td><input type="checkbox" name="isChecked" checked={todo.check} readOnly /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Box>
    )
  }
}

export default Todos;
