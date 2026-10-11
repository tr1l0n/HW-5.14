import { Component } from "react";
import "../styles.css";
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
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Search images..."
        />

        <button type="submit">Search</button>
      </form>
    );
  }
}
