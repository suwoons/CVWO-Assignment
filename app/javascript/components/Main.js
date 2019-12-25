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
      tags: [],
      inputValue: '',
      tagValue:'',
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

  getTags() {
    axios.get('/api/v1/tags')
    .then(response => {
      this.setState({tags: response.data})
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

  createTag = (tagName) => {
    axios.post('/api/v1/tags', {tag: {name:tagName}})
    .then(response => {
      const tags = update(this.state.tags, {
        $splice: [[0, 0, response.data]]
      })
      this.setState({
        tags: tags,
      })
    })
    .catch(error => console.log(error))   
  } 

  // handles editing todo title
  editTodo = (e, id, tagList) => {
    // console.log("editing: ", this.state.editValue.current.value);
    // console.log("tag edit: ", this.state.tagValue);
    if (e.key === 'Enter' && !(this.state.editValue.current === null)) {
      if (this.state.tagValue !== tagList) {
        var tagsInput = this.state.tagValue.split(","); // get array of substrings
        tagsInput.forEach(tag => tag.toLowerCase());
        console.log("tagsInput: ", tagsInput);
        console.log("all tags: ", this.state.tags);

        var tagArray = []
        // if tag does not exist, create tag and add it to array
        // else, add it to array
        tagsInput.forEach(tag => {
          const tagIndex = this.state.tags.findIndex(x => x.name === tag)
          console.log("tagIndex: ", tagIndex);
          if (tagIndex < 0) {
            axios.post('/api/v1/tags', {tag: {name:tag}})
            .then(response => {
              const tags = update(this.state.tags, {
                $splice: [[0, 0, response.data]]
              })
              this.setState({
                tags: tags,
              })
            })
            .then( response => {
              const newTag = this.state.tags[this.state.tags.length - 1] //access most recently added tag
              tagArray[tagArray.length] = newTag;
            })
            .then(console.log("newTag: ", this.state.tags[this.state.tags.length - 1]))
            .catch(error => console.log(error))   

          } else {
            tagArray[tagArray.length] = this.state.tags[tagIndex];
            console.log("after oldTag: ", tagArray);
          }
        })
        console.log("tagArray: ", tagArray);

        axios.put(`/api/v1/todos/${id}`, {todo: {title: this.state.editValue.current.value, tags: tagArray, editable: false}})
        .then(response => {
          const todoIndex = this.state.todos.findIndex(x => x.id === response.data.id)
          const todos = update(this.state.todos, {
            [todoIndex]: {$set: response.data}
          })
          this.setState({
            todos: todos,
            tagValue: '',
            editing: false,
          })
        })
        .catch(error => console.log(error))

      } else {
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
    this.setState({ [e.target.name]: e.target.value });
    // console.log(e.target.name, e.target.value);
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
    this.getTags();
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
                name="inputValue"
                onKeyPress={this.createTodo} 
                value={this.state.inputValue} onChange={this.handleChange}/>
            </div> 

            <div>
            {/* iterates through each todo item to display it*/}
              <div className="listWrapper">
                <ul className="taskList">
                {this.state.todos.map((todo) => {
                  const tagLength = todo.tags.length;
                  const tagList = todo.tags.map((tag, index) => 
                  index < tagLength - 1
                  ? tag.name + ", "
                  : tag.name);

                  return (
                    <li className="task" todo={todo} key={todo.id}>
                      <input className="taskCheckbox" type="checkbox" 
                      checked={!!todo.done}
                      onChange={(e) => this.updateTodo(e, todo.id)}/>    

                      { todo.editable // renders edit form if editable is true
                      ? <span><input className="editForm" ref={this.state.editValue} 
                        defaultValue={todo.title}
                        onKeyPress={(e) => this.editTodo(e, todo.id, tagList)}
                        ></input>

                        <input className="editTagForm"
                            placeholder="Add tags separated by a comma (eg. tag1,tag2)"
                            // find a way to have default value here too...
                            onKeyPress={(e) => this.editTodo(e, todo.id, tagList)} 
                            value={this.state.tagValue}
                            name="tagValue"
                            onChange={this.handleChange}/>
                        </span>

                      : <label className="taskLabel">{todo.title}
                          <span className="tagList"> | tag: {tagList} </span>
                      </label>
                      }

                      <span className="deleteTaskBtn"
                        onClick={(e) => this.deleteTodo(todo.id)}>
                          x
                      </span>
                      <span className="editTaskBtn">
                        {todo.editable 
                        ? <span onClick={(e) => {this.handleEdit(todo.id); this.editTodo(e, todo.id);}}>Save</span> 
                        : <span onClick={() => this.handleEdit(todo.id)}>✎</span>}
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