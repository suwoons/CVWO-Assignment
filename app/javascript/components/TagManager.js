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

        <div className="listWrapper">
          <ul className="taskList">
            {this.state.tags.map((tag) => {
              return (
                <li className="task" tag={tag} key={tag.id}>
                  <label className="taskLabel">{tag.name}
                    <span className="deleteTaskBtn"
                      onClick={(e) => this.deleteTag(tag.id)}>
                        x
                    </span>
                  </label>
                  {/* {tag.todos.map((todo) => {todo.title})} */}
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