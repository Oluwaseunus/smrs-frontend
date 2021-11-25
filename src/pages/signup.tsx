import { useHistory } from 'react-router';
import { FormEvent, useState } from 'react';
import {
  Text,
  Input,
  Button,
  Center,
  useToast,
  FormLabel,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react';

import UserService from '../api/UserService';
import UserActionsCreator from '../store/actions/user';

function Signup() {
  const toast = useToast();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const body = { email, password, lastName, firstName };
      const user = await UserService.signup(body);
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
          "Couldn't sign you up, please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Center h='100vh'>
      <form onSubmit={submitForm}>
        <Center>
          <Text fontSize='xl'>Create your account.</Text>
        </Center>

        <FormControl my={3} id='email' isRequired isDisabled={loading}>
          <FormLabel>Email address</FormLabel>
          <Input
            type='email'
            name='email'
            value={email}
            placeholder='me@example.com'
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>

        <FormControl my={3} id='firstName' isRequired isDisabled={loading}>
          <FormLabel>First Name</FormLabel>
          <Input
            type='text'
            name='firstName'
            value={firstName}
            placeholder='John'
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>

        <FormControl my={3} id='lastName' isRequired isDisabled={loading}>
          <FormLabel>Last Name</FormLabel>
          <Input
            type='text'
            name='lastName'
            value={lastName}
            placeholder='Doe'
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>

        <FormControl my={3} id='password' isRequired isDisabled={loading}>
          <FormLabel>Password</FormLabel>
          <Input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Center width='100%'>
          <Button type='submit' colorScheme='teal' m={3} isLoading={loading}>
            Sign Up
          </Button>
        </Center>
      </form>
    </Center>
  );
}

export default Signup;
