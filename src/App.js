import React, { Component } from 'react';
import axios from 'axios';
const URL = process.env.REACT_APP_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      canAdd: false,
      title: '',
      content: '',
      userName: 'yuni',
      isChecked: false,
      canUpdate: false,
      id: 0,
    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleTodoEdit = this.handleTodoEdit.bind(this);
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
  }

  componentDidMount() {
    axios.get(`${URL}/userName/yuni`)
      .then(result => {
        this.setState({
          todoList: result.data.result,
        });
      })
      .catch(error => console.error(error));
  }

  handleChange(event) {
    const { type, checked, value, name } = event.target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    });
  }

  toggleAdd() {
    this.setState(state => ({
      canAdd: !state.canAdd,
      title: '',
      content: '',
      userName: 'yuni',
      isChecked: 0,
      canUpdate: false,
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, content, isChecked, userName } = this.state;
    axios.post(URL, {
      title,
      content,
      check: isChecked,
      userName,
    })
      .then(() => {
        return axios.get(`${URL}/userName/yuni`)
      })
      .then(result => {
        this.setState({
          canAdd: false,
          todoList: result.data.result,
        });
      })
      .catch(error => console.error(error));
  }

  deleteTodo(id) {
    axios.delete(`${URL}/${id}}`)
      .then(() => {
        return axios.get(`${URL}/userName/yuni`)
      })
      .then(result => {
        this.setState({
          todoList: result.data.result,
        });
      })
      .catch(error => console.error(error));
  }

  handleTodoEdit(id) {
    axios.get(`${URL}/${id}}`)
      .then(result => {
        const { title, content, check } = result.data.result;
        this.setState({
          canAdd: false,
          canUpdate: true,
          content,
          id,
          isChecked: check,
          title,
        });
      })
      .catch(error => console.error(error));
  }

  handleSubmitUpdate(event) {
    event.preventDefault();
    const { title, content, isChecked, userName } = this.state;
    axios.put(`${URL}/${this.state.id}`, {
      title,
      content,
      check: isChecked,
      userName,
    })
      .then(() => {
        return axios.get(`${URL}/userName/yuni`)
      })
      .then(result => {
        this.setState({
          canUpdate: false,
          todoList: result.data.result,
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    const { todoList, canAdd, canUpdate } = this.state;
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
                  <td><input type="checkbox" name="isChecked" checked={todo.check} readOnly /></td>
                  <td><button onClick={() => this.handleTodoEdit(todo.id)}>수정</button></td>
                  <td onClick={() => this.deleteTodo(todo.id)}><button>삭제</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {(!!canAdd || !!canUpdate) && (
          <form onSubmit={canAdd ? this.handleSubmit : this.handleSubmitUpdate}>
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} /><br />
            <input type="text" name="content" value={this.state.content} onChange={this.handleChange} /><br />
            {canUpdate && (<><input type="checkbox" name="isChecked" value={this.state.isChecked} checked={this.state.isChecked} onChange={this.handleChange} /><br /></>)}
            <input type="submit" value="submit" />
          </form>
        )}
      </>
    )
  }
}

export default App;
