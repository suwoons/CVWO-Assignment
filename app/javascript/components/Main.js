import React from "react"
import update from "immutability-helper"
import axios from "axios"
import "../../assets/stylesheets/todos.scss"
// import "boostrap/dist/css/boostrap.css"
// import PropTypes from "prop-types"
import Header from "./Header"

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputValue: '',
      editValue: React.createRef(),
      editing: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  // get the all the todos in db
  getTodos() {
    axios.get('/api/v1/todos')
    .then(response => {
      this.setState({todos: response.data})
    })
    .catch(error => console.log(error))
  }

  createTodo = (e) => {
    if (e.key === 'Enter' && !(e.target.value === '')) {
      axios.post('/api/v1/todos', {todo: {title: e.target.value}})
      .then(response => {
        const todos = update(this.state.todos, {
          $splice: [[0, 0, response.data]]
        })
        this.setState({
          todos: todos,
          inputValue: ''
        })
      })
      .catch(error => console.log(error))      
    }    
  }
  
  // handles updating checkboxes
  updateTodo = (e, id) => {
    axios.put(`/api/v1/todos/${id}`, {todo: {done: e.target.checked}})
    .then(response => {
      const todoIndex = this.state.todos.findIndex(x => x.id === response.data.id)
      const todos = update(this.state.todos, {
        [todoIndex]: {$set: response.data}
      })
      this.setState({
        todos: todos
      })
    })
    .catch(error => console.log(error))      
  }

  // handles editing todo title
  editTodo = (e, id) => {
    console.log("editing: ", this.state.editValue.current.value);
    if (e.key === 'Enter' && !(this.state.editValue.current === null)) {
      axios.put(`/api/v1/todos/${id}`, {todo: {title: this.state.editValue.current.value, editable: false}})
      .then(response => {
        const todoIndex = this.state.todos.findIndex(x => x.id === response.data.id)
        const todos = update(this.state.todos, {
          [todoIndex]: {$set: response.data}
        })
        this.setState({
          todos: todos,
          editing: false,
        })
      })
      .catch(error => console.log(error))
    }      
  }

  deleteTodo = (id) => {
    axios.delete(`/api/v1/todos/${id}`)
    .then(response => {
      const todoIndex = this.state.todos.findIndex(x => x.id === id)
      const todos = update(this.state.todos, {
        $splice: [[todoIndex, 1]]
      })
      this.setState({
        todos: todos
      })
    })
    .catch(error => console.log(error))
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

  // changes editable parameter of todo
  handleEdit = (id) => {
    this.setState({
      editing: !this.state.editing
    })
    
    axios.put(`/api/v1/todos/${id}`, {todo: this.state.editing ? {editable: false} : {editable: true}})
    .then(response => {
      const todoIndex = this.state.todos.findIndex(x => x.id === response.data.id)
      const todos = update(this.state.todos, {
        [todoIndex]: {$set: response.data}
      })
      this.setState({
        todos: todos
      })
    })
    .then(console.log(this.state.todos))
    .catch(error => console.log(error))      
  }

  componentDidMount() {
    this.getTodos();
    this.setState({
      editing: false,
    })
  }

  render() {
    console.log(this.props);

    return (
      <React.Fragment>
          <Header heading="To-do List" />
          <ul>
            <a href="/tags">Manage Tags</a>
          </ul>
            <div className="inputContainer">
              <input className="taskInput" type="text" 
                placeholder="Add a task" maxLength="50" 
                onKeyPress={this.createTodo} 
                value={this.state.inputValue} onChange={this.handleChange}/>
            </div> 

            <div>
            {/* iterates through each todo item to display it*/}
              <div className="listWrapper">
                <ul className="taskList">
                {this.state.todos.map((todo) => {
                  const tagLength = todo.tags.length;

                  return(
                    <li className="task" todo={todo} key={todo.id}>
                      <input className="taskCheckbox" type="checkbox" 
                      checked={!!todo.done}
                      onChange={(e) => this.updateTodo(e, todo.id)}/>    

                      { todo.editable
                      ? <input className="editForm" ref={this.state.editValue} 
                        defaultValue={todo.title}
                        onKeyPress={(e) => this.editTodo(e, todo.id)}
                        ></input>
                      : <label className="taskLabel">{todo.title}
                        <span className="tagList"> | tag: {todo.tags.map((tag, index) => 
                        index < tagLength - 1
                        ? tag.name + ", "
                        : tag.name)}
                      </span>
                      </label>
                      }

                      <span className="deleteTaskBtn"
                        onClick={(e) => this.deleteTodo(todo.id)}>
                          x
                      </span>
                      <span className="editTaskBtn" onClick={() => this.handleEdit(todo.id)}>
                        {todo.editable ? "Save" : "✎"}
                      </span>
                    </li>
                    )       
                  })} 	 
                </ul>
              </div>
            </div> 
      </React.Fragment>
    );
  }
}

export default Main