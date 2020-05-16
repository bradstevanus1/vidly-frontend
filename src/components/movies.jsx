import React, { useState, useEffect } from 'react';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/SearchBox';

function getPageData(
  pageSize,
  currentPage,
  sortColumn,
  selectedGenre,
  searchQuery,
  movies
) {
  let filtered = movies;
  if (searchQuery) {
    filtered = movies.filter((m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else if (selectedGenre && selectedGenre._id) {
    filtered = movies.filter((m) => m.genre._id === selectedGenre._id);
  }

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const pageMovies = paginate(sorted, currentPage, pageSize);

  return { totalCount: filtered.length, data: pageMovies };
}

function Movies() {
  const pageSize = 4;
  const allGenresObj = { _id: '', name: 'All Genres' };

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(allGenresObj);
  const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');

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
    setSearchQuery('');
  };

  const handleSort = function (sortColumn) {
    setSortColumn(sortColumn);
  };

  function handleSearch(query) {
    setSearchQuery(query);
    setSelectedGenre(allGenresObj);
    setCurrentPage(1);
  }

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
    searchQuery,
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
        <Link
          to="/movies/new"
          className="btn btn-primary"
          style={{ marginBottom: '20px' }}
        >
          New Movie
        </Link>
        <p>Showing {totalCount} movies in the database</p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
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

export default Movies;
