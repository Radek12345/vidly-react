import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = movie => {
    const filteredMovies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: filteredMovies });
  };

  render() {
    const { length: moviesCount } = this.state.movies;

    if (moviesCount === 0) return <p>There are no movies in the database</p>;

    return (
      <React.Fragment>
        <p>Showing {moviesCount} movies in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
            </tr>
          </thead>
          <tbody>{this.getMoviesMarkups()}</tbody>
        </table>
      </React.Fragment>
    );
  }

  getMoviesMarkups() {
    const movies = this.state.movies.map(movie => (
      <tr key={movie._id}>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.handleDelete(movie)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return movies;
  }
}

export default Movies;
