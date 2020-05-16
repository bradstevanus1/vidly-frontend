import React from "react";
import Table from "./common/table";
import PropTypes from "prop-types";
import Like from "./common/like";
import { Link } from "react-router-dom";

function MoviesTable({ movies, sortColumn, onDelete, onLike, onSort }) {
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <Table
      data={movies}
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}

const genreShape = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const moviesShape = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.shape(genreShape),
  numberInStock: PropTypes.number.isRequired,
  dailyRentalRate: PropTypes.number.isRequired,
  publishDate: PropTypes.string,
  liked: PropTypes.bool,
};

MoviesTable.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape(moviesShape)).isRequired,
};

export default MoviesTable;
