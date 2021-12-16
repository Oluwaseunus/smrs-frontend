import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Center, Spinner, useToast } from '@chakra-ui/react';

import Router from './Router';
import { store } from './store';
import UserService from './api/UserService';
import MovieService from './api/MovieService';
import UserActionsCreator from './store/actions/user';

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
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
