import { useHistory } from 'react-router';
import { useState, FormEvent } from 'react';
import { Text, Button, Input, Center, FormControl } from '@chakra-ui/react';
import UserActionsCreator from '../store/actions/user';

export default function Login() {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await new Promise((resolve) => setTimeout(resolve, 500));

    UserActionsCreator.authenticate({ _id: '1', username });
    history.push('/home');
  }

  return (
    <Center h='100vh'>
      <form onSubmit={submitForm}>
        <Center>
          <Text fontSize='xl'>Enter your username and password.</Text>
        </Center>
        <FormControl isRequired my={3}>
          <Input
            type='text'
            id='username'
            name='username'
            value={username}
            variant='outline'
            placeholder='Username'
            className='form__input-field'
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired my={3}>
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
          <Button type='submit' colorScheme='teal' m={3}>
            Login
          </Button>
        </Center>
      </form>
    </Center>
  );
}
