import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "../components/common/like";
import Pagination from "../components/common/pagination";

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4
  };

  handleDelete = movie => {
    const filteredMovies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: filteredMovies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: moviesCount } = this.state.movies;
    const { pageSize, currentPage } = this.state;

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
              <th />
            </tr>
          </thead>
          <tbody>{this.getMoviesMarkups()}</tbody>
        </table>

        <Pagination
          itemsCount={moviesCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
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
          <Like onLike={() => this.handleLike(movie)} isLiked={movie.liked} />
        </td>
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
