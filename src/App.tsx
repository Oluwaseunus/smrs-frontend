import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Center, Spinner, ChakraProvider } from '@chakra-ui/react';

import Index from './pages';
import { store } from './store';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Navbar from './components/Navbar';
import MovieService from './api/MovieService';
import SingleMovie from './pages/singleMovie';
import UserActionsCreator from './store/actions/user';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function auth() {
      const user = localStorage.getItem('user');
      if (user) UserActionsCreator.authenticate(JSON.parse(user));

      MovieService.getConfig();
      setLoading(false);
    }

    auth();
  }, []);

  return loading ? (
    <Center>
      <Spinner size='xl' />
    </Center>
  ) : (
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <Navbar />

          <Switch>
            <Route exact path='/' component={Index} />

            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <ProtectedRoute path='/home' component={Home} />
            <ProtectedRoute path='/item/:movieId' component={SingleMovie} />
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
