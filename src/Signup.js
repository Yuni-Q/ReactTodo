import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from 'axios';

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

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '안녕하세요',
      password: '',
      redirect: false,
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }
  
  async onClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const { email, password } = this.state;
    try {
    const result = await axios.post(`${URL}/users`, {
      email,
      password,
    })
    if(result.status === 200 && result.data.ok === true) {
      this.setState({
        redirect: true,
      })
    }
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    if(this.state.redirect) {
      return (<Redirect to="/login"/>)
    }
    return (
      <Box>
        <h1>회원가입</h1>
        <Form>
          <Box2>
            <label htmlFor="email">email</label>
            <input type="text" id="email" onChange={this.onChange} value={this.state.email} />
          </Box2>
          <Box2>
            <label htmlFor="password">password</label>
            <input type="password" id="password" onChange={this.onChange} value={this.state.password} />
          </Box2>
          <button onClick={this.onClick}>회원가입</button>
        </Form>
        <Link to="/login">로그인</Link>
      </Box>
    );
  }
}

export default Signup;