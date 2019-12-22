import React from "react"
import PropTypes from "prop-types"
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        filtered: [],
        searching: false, 
        // flag to indicate whether main should be displaying default or search results
    }
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.items
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.items
    });
  }

  render () {
    return (
      <React.Fragment>
        <div>
            <input className="SearchBarInput" 
            type="text" placeholder="Search..." />
            <ul>
            ...
            </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchBar
