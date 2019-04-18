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
      todo: {},
      token,
      redirect: false,
    }
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  async componentDidMount() {
    console.log(this.props.match.params.id);
    const { id } = this.props.match.params;
    const result = await axios.get(`${URL}/todos/${id}`, {
      headers: {
        Authorization: 'Bearer ' + this.state.token //the token is a variable which holds the token
      }
    });
    if(result.status === 200 && result.data.ok === true) {
      this.setState({
        todo: result.data.result,
      })
    } else {
      console.log(result.data.error);
    }
  }

  async deleteTodo(id) {
    try {
      await axios.delete(`${URL}/todos/${id}`, {
        headers: {
          Authorization: 'Bearer ' + this.state.token //the token is a variable which holds the token
        }
      })
      this.props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  }
  
  render() {
    if(!this.state.token) {
      this.props.history.push('/login');
    }
    const { todo } = this.state;
    return (
      <Box>
        <h1>지금부터 웹을 만들어 보겠습니다.</h1>
        <Link to="createTodo">추가</Link>
        <table border={1}>
          <thead>
            <tr>
              <th>title</th>
              <th>content</th>
              <th>check</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
                <tr key={todo.id}>
                  <td onClick={() => this.props.history.push('/todos/:id')}>{todo.title}</td>
                  <td>{todo.content}</td>
                  <td><input type="checkbox" name="isChecked" checked={todo.check} readOnly /></td>
                  <td onClick={() => this.props.history.push(`/updateTodo/${todo.id}`)}><button>수정</button></td>
                  <td onClick={() => this.deleteTodo(todo.id)}><button>삭제</button></td>
                </tr>
          </tbody>
        </table>
        <button onClick={() => this.props.history.goBack()}>이전</button>
      </Box>
    )
  }
}

export default Todos;
