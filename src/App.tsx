import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { Center, Spinner, useToast } from '@chakra-ui/react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Index from './pages';
import { store } from './store';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Navbar from './components/Navbar';
import UserService from './api/UserService';
import MovieService from './api/MovieService';
import SingleMovie from './pages/singleMovie';
import UserActionsCreator from './store/actions/user';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function auth() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = await UserService.verify(token);
          UserActionsCreator.authenticate(user);
        } catch (err: any) {
          toast({
            position: 'top',
            status: 'error',
            isClosable: true,
            variant: 'left-accent',
            title: "Couldn't sign you in, please login manually.",
          });
        }
      }

      await MovieService.getConfig();
      setLoading(false);
    }

    auth();
  }, [toast]);

  return loading ? (
    <Center width='100vw' height='100vh'>
      <Spinner size='xl' />
    </Center>
  ) : (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <ProtectedRoute path='/home' component={Home} />
          <ProtectedRoute exact path='/' component={Index} />
          <ProtectedRoute path='/item/:movieId' component={SingleMovie} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
