import React from "react"
import PropTypes from "prop-types"
import update from "immutability-helper"
import axios from "axios"
import "../../assets/stylesheets/heading.scss"

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      usernames: [],
      editing: false,
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getUsers() {
    axios.get('/api/v1/users')
    .then(response => {
      this.setState({usernames: response.data})
    })
    .catch(error => console.log(error));
  }

  setUsername = (e) => {
    if (e.key === 'Enter' && !(e.target.value === '')) {
      console.log(this.state.usernames.length, "length");
      if (this.state.usernames.length === 0) {
        axios.post('/api/v1/users', {user: {name: e.target.value}})
        .then(response => {
          console.log("response data", response.data)
          const usernames = update(this.state.usernames, {
            $splice: [[0, 0, response.data]]
          })
          this.setState({
            usernames: usernames,
            inputValue: '',
            editing: false
          })
        })
      .catch(error => console.log(error));
      } else { // only ever have 1 item in the list
        axios.put(`/api/v1/users/${1}`, {user: {name: e.target.value}})
        .then(response => {
          const usernameIndex = 0
          const usernames = update(this.state.usernames, {
            [usernameIndex]: {$set: response.data}
          })
          this.setState({
            usernames: usernames,
            inputValue: '',
            editing: false
          })
        })
        .catch(error => console.log(error));   
      }
    }
  }

  handleUsernameChange = (e) => {
    console.log(e.target.value);
    this.setState({ inputValue: e.target.value });
  }

  handleClick = (e) => {
    this.setState({
      editing: true,
    })
  }

  componentDidMount() {
    this.getUsers();
  }

  render () {
    return (
      <React.Fragment>
        <div className="wrapper">
          {this.state.usernames.length === 0 || this.state.editing === true
          ? <h1><input className="input" type="text" 
              placeholder="What's your name?" maxLength="50" 
              onKeyPress={this.setUsername} 
              value={this.inputValue} onChange={this.handleUsernameChange} />
              <span className="underline"></span></h1>
          : <h1 onClick={this.handleClick}>{this.state.usernames[0].name + "\'s " + this.props.heading}</h1>
          }
        </div>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  heading: PropTypes.string
};
export default Header
