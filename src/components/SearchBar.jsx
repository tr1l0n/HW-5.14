import { Component } from "react";
import "../styles.css";
import { FaSearch } from "react-icons/fa";
export class SearchBar extends Component {
  state = {
    query: "",
  };

  handleChange = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const query = this.state.query.trim();

    if (!query) return;

    this.props.onSubmit(query);

  };

  render() {
    return (
      <header className="searchbar">
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="searchForm-button">
            <FaSearch/>
          {/* <span className="seacrhForm-button-label">Search</span> */}
        </button>

        <input
          className="searchForm-input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={this.state.query}
          onChange={this.handleChange}
        />
      </form>
    </header>
    );
  }
}
