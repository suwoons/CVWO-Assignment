import React from "react"
// import PropTypes from "prop-types"
// import AllTodos from "./AllTodos";

class TodosContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <div className="inputContainer">
            <input className="taskInput" type="text" 
              placeholder="Add a task" maxLength="30" />
          </div>  	    
          <div className="listWrapper">
            <ul className="taskList">
            </ul>
          </div>
        </div>    
      </React.Fragment>
    );
  }
}

export default TodosContainer
