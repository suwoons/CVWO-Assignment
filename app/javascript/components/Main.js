import React from "react"
import update from "immutability-helper"
import axios from "axios"
// import PropTypes from "prop-types"
// import TodosContainer from "./TodosContainer"
// import AllTodos from "./AllTodos";

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      inputValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

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

  componentDidMount() {
    this.getTodos()
  }

  render() {
    console.log(this.props);
    console.log("rendered main");
    return (
      <React.Fragment>
        <label>Write task below:</label>
        <div>
          <div className="inputContainer">
            <input className="taskInput" type="text" 
              placeholder="Add a task" maxLength="50" 
              onKeyPress={this.createTodo} 
              value={this.state.inputValue} onChange={this.handleChange}/>
          </div>  	    
          <div className="listWrapper">
            <ul className="taskList">
            {this.state.todos.map((todo) => {
              return(
                <li className="task" todo={todo} key={todo.id}>
                  <input className="taskCheckbox" type="checkbox" 
                  checked={todo.done}
                  onChange={(e) => this.updateTodo(e, todo.id)}/>              
                  <label className="taskLabel">{todo.title}</label>
                  <span className="deleteTaskBtn"
                    onClick={(e) => this.deleteTodo(todo.id)}>
                      x
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