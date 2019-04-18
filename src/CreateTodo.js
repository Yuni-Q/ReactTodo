import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const Form = styled.form`
  width: 250px;
  display: flex;
  flex-direction: column;
`

const Box2 = styled.div`
  display: flex;
  justify-content: space-between;
`

class CreateTodo extends Component {
  constructor(props) {
    super(props);
    const token = checkLogin();
    this.state = {
      token,
      title: '',
      content: '',
      redirect: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleChange(event) {
    const { type, checked, value, id } = event.target;
    this.setState({
      [id]: type === 'checkbox' ? checked : value,
    });
  }

  async onClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const { title, content } = this.state;
    console.log(title);
    try {
    const result = await axios.post(`${URL}/todos`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: 'Bearer ' + this.state.token, //the token is a variable which holds the token
          'Content-Type': 'application/json',

        },
      }
    )
    console.log(content);
    if(result.status === 200 && result.data.ok === true) {
      this.props.history.push('/');
    }
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Box>
      <Form>
        <Box2>
        <label htmlFor="title">title</label>
        <input type="text" id="title" value={this.state.title} onChange={this.handleChange} />
        </Box2>
        <Box2>
        <label htmlFor="content">content</label>
        <input type="text" id="content" value={this.state.content} onChange={this.handleChange} />
        </Box2>
        <button onClick={this.onClick}>추가</button>
      </Form>
      <button onClick={() => this.props.history.goBack()}>이전</button>
      </Box>
    );
  }
}

export default CreateTodo;