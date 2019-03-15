import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      isAdd: false,
      title: '',
      content: '',
      userName: 'yuni',
      check: false,
      isUpdate: false,
      id: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.preUpdateTodo = this.preUpdateTodo.bind(this);
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  };

  componentDidMount() {
    axios.get('http://13.113.246.46:8081/todos/userName/yuni')
      .then(result => {
        this.setState({
          todoList: result.data.result,
        })
      })
      .catch(error => console.log(error));
  };

  componentDidUpdate() {
    axios.get('http://13.113.246.46:8081/todos/userName/yuni')
      .then(result => {
        if(JSON.stringify(this.state.todoList) !== JSON.stringify(result.data.result)) {
          this.setState({
            todoList: result.data.result,
            isAdd: false,
            isUpdate: false,
            title: '',
            content: '',
            userName: 'yuni',
            check: 0,
          })
        }
      })
      .catch(error => console.log(error));
  };

  handleChange(event) {
    console.log(event.target.name,!event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toggleAdd() {
    this.setState({
      isAdd: true,
      title: '',
      content: '',
      userName: 'yuni',
      check: 0,
      isUpdate: false,
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      title: this.state.title,
      content: this.state.content,
      check: this.state.check,
    });
    axios.post('http://13.113.246.46:8081/todos', {
      title: this.state.title,
      content: this.state.content,
      check: this.state.check,
      userName: this.state.userName,
    })
      .then(result => console.log(result))
      .catch(error => console.error(error));
  };

  deleteTodo(id) {
    axios.delete(`http://13.113.246.46:8081/todos/${id}}`)
      .then(result => {
        this.forceUpdate();
        console.log(result)
      })
      .catch(error => console.error(error));
  };

  preUpdateTodo(id) {
    axios.get(`http://13.113.246.46:8081/todos/${id}}`)
      .then(result => {
        this.setState({
          isAdd: false,
          title: result.data.result.title,
          content: result.data.result.content,
          check: result.data.result.check,
          isUpdate: true,
          id,
        });
      })
      .catch(error => console.error(error));
  };

  handleSubmitUpdate(event) {
    console.log(this.state.check);
    event.preventDefault();
    this.setState({
      title: this.state.title,
      content: this.state.content,
      check: this.state.check,
    });
    axios.put(`http://13.113.246.46:8081/todos/${this.state.id}`, {
      title: this.state.title,
      content: this.state.content,
      check: this.state.check,
      userName: this.state.userName,
    })
      .then(result => {
        this.forceUpdate();
        console.log(result);
      })
      .catch(error => console.error(error));
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    console.log(name,value,this.state.check);
  };

  render() {
    const { todoList } = this.state;
    console.log(todoList);
    return (
      <>
        <h1>지금부터 웹을 만들어 보겠습니다.</h1>
        <div>할일이 {todoList.length}개 있습니다.</div>
        <button onClick={this.toggleAdd}>추가</button>
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
          {todoList.map((todo) => {
            return (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.content}</td>
                <td><input type="checkbox" name="chexck" checked={todo.check===1} readOnly/></td>
                <td onClick={() => this.preUpdateTodo(todo.id)}><button>수정</button></td>
                <td onClick={() => this.deleteTodo(todo.id)}><button>삭제</button></td>
              </tr>
            )
          })}
          </tbody>
        </table>
        {this.state.isAdd && (
          <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/><br/>
          <input type="text" name="content" value={this.state.content} onChange={this.handleChange}/><br/>
          <input type="submit" value="Submit"/>
        </form>
        )}
        {this.state.isUpdate && (
          <form onSubmit={this.handleSubmitUpdate}>
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/><br/>
          <input type="text" name="content" value={this.state.content} onChange={this.handleChange}/><br/>
          <input type="checkbox" name="check" value={this.state.check===1 || this.state.check} checked={this.state.check===1 || this.state.check} onChange={this.handleInputChange}/><br/>
          <input type="submit" value="Submit"/>
        </form>
        )}
      </>
    );
  }
}

export default App;
