import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Index from './pages';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import { RootState } from './store';
import Navbar from './components/Navbar';
import Watchlist from './pages/watchlist';
import SingleMovie from './pages/singleMovie';
import ProtectedRoute from './components/ProtectedRoute';
import WatchlistActionsCreator from './store/actions/watchlist';

function Router() {
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user._id) {
      WatchlistActionsCreator.fetchWatchList();
    }
  }, [user._id]);

  return (
    <>
      <Navbar />

      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <ProtectedRoute path='/home' component={Home} />
        <ProtectedRoute exact path='/' component={Index} />
        <ProtectedRoute path='/item/:movieId' component={SingleMovie} />
        <ProtectedRoute path='/watchlist' component={Watchlist} />
      </Switch>
    </>
  );
}

export default Router;
