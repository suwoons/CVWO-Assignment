import React from "react"
import PropTypes from "prop-types"
import update from "immutability-helper"
import axios from "axios"
import Header from "./Header"
import "../../assets/stylesheets/tags.scss"

class TagManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      todos: [],
      inputValue: '',
      editValue: React.createRef(),
      editing: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  getTodos() {
    axios.get('/api/v1/todos')
    .then(response => {
      this.setState({todos: response.data})
    })
    .catch(error => console.log(error));
  }

  getTags() {
    axios.get('/api/v1/tags')
    .then(response => {
      this.setState({tags: response.data})
    })
    .catch(error => console.log(error));
  }

  createTag = (e) => {
    if (e.key === 'Enter' && !(e.target.value === '')) {
      axios.post('/api/v1/tags', {tag: {name:e.target.value}})
      .then(response => {
        const tags = update(this.state.tags, {
          $splice: [[0, 0, response.data]]
        });
        this.setState({
          tags: tags,
          inputValue: ''
        });
      })
      .then(console.log("updated tags: ", this.state.tags))
      .catch(error => console.log(error));
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
    .catch(error => console.log(error));      
  }

  editTag = (e, id) => {
    console.log('editValue: ', this.state.editValue.current.value);

    if (this.state.editValue.current === null || this.state.editValue.current.value === '') {
      alert("You can't have a blank tag :(");
    } else if (e.key === 'Enter' || e.type === 'click') {
      axios.put(`/api/v1/tags/${id}`, {tag: {name: this.state.editValue.current.value, editable: false}})
      .then(response => {
        const tagIndex = this.state.tags.findIndex(x => x.id === response.data.id)
        const tags = update(this.state.tags, {
          [tagIndex]: {$set: response.data}
        })
        this.setState({
          tags: tags,
          editValue: '',
          editing: false,
        })
      })
      .catch(error => console.log(error));
    }
  }

  deleteTag = (id) => {
    axios.delete(`/api/v1/tags/${id}`)
    .then(response => {
      const tagIndex = this.state.tags.findIndex(x => x.id === id)
      const tags = update(this.state.tags, {
        $splice: [[tagIndex, 1]]
      })
      this.setState({
        tags: tags
      })
    })
    .catch(error => console.log(error));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // toggles boolean editing
  handleEdit = (id) => {
    this.setState({
      editing: !this.state.editing
    });
    
    axios.put(`/api/v1/tags/${id}`, {tag: this.state.editing ? {editable: false} : {editable: true}})
    .then(response => {
      const tagIndex = this.state.tags.findIndex(x => x.id === response.data.id)
      const tags = update(this.state.tags, {
        [tagIndex]: {$set: response.data}
      })
      this.setState({
        tags: tags
      })
    })
    .then(console.log(this.state.tags))
    .catch(error => console.log(error));      
  }

  componentDidMount() {
    this.getTags();
    this.getTodos();
    this.setState({
      editing: false,
    })
  }

  render () {
    console.log(this.props);
    return (
      <React.Fragment>
        <Header heading="Tag List" />
        <ul>
          <a href="../">Back to List</a>
        </ul>

        <div className="inputContainer">
          <input className="tagInput" type="text" 
            placeholder="Add a new tag" maxLength="50" 
            name="inputValue"
            onKeyPress={this.createTag} 
            value={this.state.inputValue} onChange={this.handleChange}/>
        </div> 

        <div className="listWrapper">
          <ul className="taskList">
            {this.state.tags.map((tag) => {
              var todoList = [];
              this.state.todos.map((todo) =>
                todo.tags.map((todoTag) => 
                  { if (todoTag.id === tag.id) return todoList[todoList.length] = todo; }
              ));

              return (
                <li className="tag" tag={tag} key={tag.id}>
                  {tag.editable
                  ? <span><input className="editForm" 
                    ref={this.state.editValue} 
                    defaultValue={tag.name}
                    onKeyPress={(e) => this.editTag(e, tag.id)}
                    /></span>
                  : <label className="tagLabel">{tag.name}</label>}
                  
                  {tag.editable
                    ? <span className="cancelTagBtn" 
                        onClick={() => this.handleEdit(tag.id)}>
                          Cancel
                      </span>
                    : <span className="deleteTagBtn"
                        onClick={(e) => this.deleteTag(tag.id)}>
                          x
                      </span>}

                  <span className="editTagBtn">
                    {tag.editable 
                    ? <span onClick={(e) => this.editTag(e, tag.id)}>Save</span> 
                    : <span onClick={() => this.handleEdit(tag.id)}>✎</span>}
                  </span>

                  <span className="taskListWrapper">
                    {todoList.map((todo) => 
                        <span className="taskList">
                          <ul className="task" key={todo.id}>
                            <input className="taskCheckbox" type="checkbox" 
                            checked={!!todo.done}
                            onChange={(e) => this.updateTodo(e, todo.id)}/> 
                            <label className="taskLabel">{todo.title}</label>
                          </ul>
                        </span>
                    )}
                  </span>

                </li>
              )
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default TagManager