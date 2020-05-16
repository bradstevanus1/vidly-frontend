import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Movies from './components/movies';
import Navbar from './components/common/navbar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';

import './App.css';
import RegisterForm from './components/registerForm';

function App() {
  const home = {
    label: 'Vidly',
    address: '/',
  };
  const links = [
    {
      label: 'Movies',
      address: '/movies',
    },
    {
      label: 'Customers',
      address: '/customers',
    },
    {
      label: 'Rentals',
      address: '/rentals',
    },
    {
      label: 'Login',
      address: '/login',
    },
    { label: 'Register', address: '/register' },
  ];

  return (
    <>
      <Navbar home={home} links={links} selectedLink={links[0]} />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/customers" component={Customers} />
          <Route exact path="/rentals" component={Rentals} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/movies" />
        </Switch>
      </main>
    </>
  );
}

export default App;
