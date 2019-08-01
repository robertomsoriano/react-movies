// Main.js

import React from "react";
import "./Main.css";
import Navigation from "./navigation/Navigation";
import Movies from "./movies/Movies";

class Main extends React.Component {
  state = {
    movies: [],
    total_pages: 1,
    page: 1,
    url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${
      process.env.REACT_APP_MOVIE_API
    }&language=en-US`,
    moviesUrl: `https://api.themoviedb.org/3/discover/movie?api_key=${
      process.env.REACT_APP_MOVIE_API
    }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
    searchStr: null,
    searchTypeStr: true,
    // searchUrl: `https://api.themoviedb.org/3/search/movie?api_key=${
    //   process.env.REACT_APP_MOVIE_API
    // }&language=en-US&query=${this.searchStr}&page=1&include_adult=false`,
    genre: "Horror",
    genres: [],
    year: {
      label: "year",
      min: 1990,
      max: 2019,
      step: 1,
      value: { min: 2000, max: 2019 }
    },
    rating: {
      label: "rating",
      min: 0,
      max: 10,
      step: 1,
      value: { min: 8, max: 10 }
    },
    runtime: {
      label: "runtime",
      min: 0,
      max: 300,
      step: 15,
      value: { min: 60, max: 120 }
    }
  };

  componentDidMount() {
    this.fetchMovies(this.state.moviesUrl);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.moviesUrl !== nextState.moviesUrl) {
      this.fetchMovies(nextState.moviesUrl);
    }
    if (this.state.page !== nextState.page) {
      this.generateUrl(nextState.searchStr, nextState.page);
    }
  }

  onGenreChange = event => {
    this.setState({ genre: event.target.value });
  };

  setGenres = genres => {
    this.setState({ genres });
  };

  onChange = data => {
    this.setState({
      [data.type]: {
        ...this.state[data.type],
        value: data.value
      }
    });
  };

  generateUrl = (
    queryStr = this.state.searchStr,
    nextPage = this.state.page
  ) => {
    const { genres, year, rating, runtime } = this.state;
    const selectedGenre = genres.find(genre => genre.name === this.state.genre);
    const genreId = selectedGenre.id;

    if (!queryStr && !this.state.searchTypeStr) {
      const moviesUrl =
        `https://api.themoviedb.org/3/discover/movie?` +
        `api_key=${process.env.REACT_APP_MOVIE_API}&` +
        `language=en-US&sort_by=popularity.desc&` +
        `with_genres=${genreId}&` +
        `primary_release_date.gte=${year.value.min}-01-01&` +
        `primary_release_date.lte=${year.value.max}-12-31&` +
        `vote_average.gte=${rating.value.min}&` +
        `vote_average.lte=${rating.value.max}&` +
        `with_runtime.gte=${runtime.value.min}&` +
        `with_runtime.lte=${runtime.value.max}&` +
        `page=${nextPage}`;

      this.setState({ moviesUrl });
    } else {
      const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.REACT_APP_MOVIE_API
      }&language=en-US&query=${queryStr}&page=${nextPage}&include_adult=false`;
      this.setState({ moviesUrl });
    }
  };

  onSearchButtonClick = () => {
    this.setState({ page: 1 });
    this.generateUrl();
  };

  fetchMovies = url => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.storeMovies(data);
      })
      .catch(error => console.log(error));
  };
  fetchSearch = str => {
    this.setState({ searchStr: str, page: 1 });
    this.generateUrl(str);
  };
  setSearchType = () => {
    this.setState({ searchTypeStr: !this.state.searchTypeStr });
  };

  storeMovies = data => {
    const movies = data.results.map(result => {
      const {
        vote_count,
        id,
        genre_ids,
        poster_path,
        title,
        vote_average,
        release_date,
        overview
      } = result;
      return {
        vote_count,
        id,
        genre_ids,
        poster_path,
        title,
        vote_average,
        release_date,
        overview
      };
    });
    this.setState({ movies, total_pages: data.total_pages });
  };

  onPageIncrease = () => {
    const { page, total_pages } = this.state;
    const nextPage = page + 1;
    if (nextPage <= total_pages) {
      this.setState({ page: nextPage });
    }
  };

  onPageDecrease = () => {
    const nextPage = this.state.page - 1;
    if (nextPage > 0) {
      this.setState({ page: nextPage });
    }
  };

  render() {
    return (
      <>
        <Navigation
          onChange={this.onChange}
          onGenreChange={this.onGenreChange}
          setGenres={this.setGenres}
          onSearchButtonClick={this.onSearchButtonClick}
          fetchSearch={this.fetchSearch}
          setSearchType={this.setSearchType}
          {...this.state}
        />
        <section className="main">
          <Movies
            movies={this.state.movies}
            page={this.state.page}
            onPageIncrease={this.onPageIncrease}
            onPageDecrease={this.onPageDecrease}
          />
        </section>
      </>
    );
  }
}

export default Main;
