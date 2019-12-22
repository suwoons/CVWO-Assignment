import React from "react"
import PropTypes from "prop-types"
import "../../assets/stylesheets/heading.scss"

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.username = 'Sarah';
    this.state = {
      inputValue: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  setUsername = (e) => {
    if (e.key === 'Enter' && !(e.target.value === '')) {
      this.setState({
        username: e.target.value,
        inputValue: ''
      })
    }
  }

  handleUsernameChange = (e) => {
    console.log(e.target.value);
    this.setState({ inputValue: e.target.value });
  }

  render () {
    return (
      <React.Fragment>
        <div className="wrapper">
          {this.username === ''
          ? <h1><input className="input" type="text" 
              placeholder="What's your name?" maxLength="50" 
              onKeyPress={this.setUsername} 
              value={this.inputValue} onChange={this.handleUsernameChange} />
              <span className="underline"></span></h1>
          : <h1>{this.username + "\'s " + this.props.heading}</h1>
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
