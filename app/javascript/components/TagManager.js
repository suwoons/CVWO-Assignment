import React from "react"
import PropTypes from "prop-types"
import update from "immutability-helper"
import axios from "axios"
import Header from "./Header"

class TagManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      inputValue: '',
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleEdit = this.handleEdit.bind(this);
  }

  // get the all the tags in db
  getTags() {
    axios.get('/api/v1/tags')
    .then(response => {
      this.setState({tags: response.data})
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getTags();
  }


  render () {
    console.log(this.props);

    return (
      <React.Fragment>
        <Header heading="To-do List" />
        <ul>
          <a href="../">Back to List</a>
        </ul>

      
        {this.state.tags.map((tag) => {
          return (
            <div>
            <ul key={tag.id}>{tag.name}</ul>
          {/* {tag.todos.map((todo) => <li key={todo.id}>Posts that are tagged: {todo.title})}</li> */}
          </div>);
        })}
      </React.Fragment>
    );
  }
}

export default TagManager
