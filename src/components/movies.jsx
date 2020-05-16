import React, { useState, useEffect } from 'react';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

function getPageData(pageSize, currentPage, sortColumn, selectedGenre, movies) {
  const filtered =
    selectedGenre && selectedGenre._id
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const pageMovies = paginate(sorted, currentPage, pageSize);

  return { totalCount: filtered.length, data: pageMovies };
}

function Movies({ history }) {
  const pageSize = 4;
  const allGenresObj = { _id: '', name: 'All Genres' };

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(allGenresObj);
  const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });

  function handleCickNewMovie() {
    history.push('/movies/new');
  }

  const handleDelete = function (movie) {
    const newMovies = movies.filter((m) => m._id !== movie._id);
    setMovies(newMovies);
  };

  const handleLike = function (movie) {
    const newMovies = [...movies];
    const index = newMovies.indexOf(movie);
    newMovies[index] = { ...newMovies[index] };
    newMovies[index].liked = !newMovies[index].liked;
    setMovies(newMovies);
  };

  const handlePageChange = function (page) {
    setCurrentPage(page);
  };

  const handleGenreSelect = function (genre) {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleSort = function (sortColumn) {
    setSortColumn(sortColumn);
  };

  useEffect(() => {
    setMovies(getMovies());
    const genres = [allGenresObj, ...getGenres()];
    setGenres(genres);
  }, []);

  if (movies.length === 0) {
    return <p>There are no movies in the database.</p>;
  }

  const { totalCount, data: pageMovies } = getPageData(
    pageSize,
    currentPage,
    sortColumn,
    selectedGenre,
    movies
  );

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onGroupSelect={handleGenreSelect}
        />
      </div>
      <div className="col">
        <button
          className="btn btn-primary"
          style={{ marginBottom: '20px' }}
          onClick={handleCickNewMovie}
        >
          New Movie
        </button>
        <p>Showing {totalCount} movies in the database</p>
        <MoviesTable
          movies={pageMovies}
          sortColumn={sortColumn}
          onDelete={handleDelete}
          onLike={handleLike}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default withRouter(Movies);
