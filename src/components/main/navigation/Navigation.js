// Navigation.js

import React from "react";
import "./Navigation.css";
import Selection from "./Selection";
import Slider from "./Slider";
import Search from "./Search";
import SearchButton from "./SearchButton";
// import Button from "./Button";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
      setSearchType: this.props.setSearchType
    };
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(response => response.json())
      .then(data => this.props.setGenres(data.genres))
      .catch(error => console.log(error));
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.filter !== nextState.filter) {
      this.state.setSearchType();
    }
  }
  toggleFilter() {
    this.setState({ filter: !this.state.filter });
  }

  render() {
    const {
      genre,
      genres,
      onGenreChange,
      onChange,
      year,
      rating,
      runtime,
      onSearchButtonClick,
      fetchSearch
    } = this.props;
    return (
      <>
        <hr />
        {!this.state.filter && (
          <Search
            onSearchButtonClick={onSearchButtonClick}
            toggleFilter={this.toggleFilter}
            fetchSearch={fetchSearch}
          />
        )}
        {this.state.filter && (
          <>
            <section>
              <button
                className="btn btn-info btn-sm mb-2"
                onClick={e => this.toggleFilter()}
              >
                <i className="fas fa-search" /> Search by name
              </button>
            </section>
            <section className="navigation">
              <Selection
                genre={genre}
                genres={genres}
                onGenreChange={onGenreChange}
              />

              <Slider data={year} onChange={onChange} />
              <Slider data={rating} onChange={onChange} />
              <Slider data={runtime} onChange={onChange} />
              <SearchButton onSearchButtonClick={onSearchButtonClick} />
            </section>
          </>
        )}
      </>
    );
  }
}

export default Navigation;
