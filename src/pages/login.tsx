import { useHistory } from 'react-router';
import { useState, FormEvent } from 'react';
import {
  Text,
  Input,
  Button,
  Center,
  useToast,
  FormControl,
} from '@chakra-ui/react';

import UserService from '../api/UserService';
import UserActionsCreator from '../store/actions/user';

export default function Login() {
  const toast = useToast();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await UserService.login({ email, password });
      UserActionsCreator.authenticate(user);
      history.push('/home');
    } catch (err: any) {
      toast({
        position: 'top',
        status: 'error',
        isClosable: true,
        variant: 'left-accent',
        title:
          err.response.data.message ||
          "Couldn't sign you in, please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Center h='100vh'>
      <form onSubmit={submitForm}>
        <Center>
          <Text fontSize='xl'>Enter your email and password.</Text>
        </Center>
        <FormControl isRequired my={3} isDisabled={loading}>
          <Input
            id='email'
            type='email'
            name='email'
            value={email}
            variant='outline'
            placeholder='email'
            className='form__input-field'
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired my={3} isDisabled={loading}>
          <Input
            type='password'
            id='password'
            name='password'
            value={password}
            variant='outline'
            placeholder='Password'
            className='form__input-field'
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Center width='100%'>
          <Button type='submit' colorScheme='teal' m={3} isLoading={loading}>
            Login
          </Button>
        </Center>
      </form>
    </Center>
  );
}
