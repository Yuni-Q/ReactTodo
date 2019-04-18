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
      isChecked: false,
      todo: {},
      redirect: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
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
      const { id, title, content, check } = result.data.result;
      this.setState({
        id,
        title,
        content,
        isChecked: check,
      })
    } else {
      console.log(result.data.error);
    }
  }

  handleChange(event) {
    const { type, checked, value, id } = event.target;
    console.log();
    this.setState({
      [id]: type === 'checkbox' ? checked : value,
    });
  }

  async onClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const { id, title, content, isChecked } = this.state;
    console.log(title);
    try {
    const result = await axios.put(`${URL}/todos/${id}`,
      {
        title,
        content,
        check: isChecked,
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
    const { title, content, isChecked } = this.state
    return (
      <Box>
      <Form>
        <Box2>
        <label htmlFor="title">title</label>
        <input type="text" id="title" value={title} onChange={this.handleChange} />
        </Box2>
        <Box2>
        <label htmlFor="content">content</label>
        <input type="text" id="content" value={content} onChange={this.handleChange} />
        </Box2>
        <input type="checkbox" id="isChecked" value={isChecked} checked={isChecked} onChange={this.handleChange} />
        <button onClick={this.onClick}>수정</button>
      </Form>
      <button onClick={() => this.props.history.goBack()}>이전</button>
      </Box>
    );
  }
}

export default CreateTodo;