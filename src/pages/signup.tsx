import { useState } from 'react';
import {
  Text,
  Flex,
  Input,
  Button,
  Center,
  FormLabel,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');

  async function submitForm() {}

  return (
    <Center h='100vh'>
      <form onSubmit={submitForm}>
        <Center>
          <Text fontSize='xl'>Create your account.</Text>
        </Center>

        <FormControl my={3} id='email' isRequired>
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

        <FormControl my={3} id='password' isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <FormControl my={3} id='firstName' isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            type='text'
            name='firstName'
            value={firstName}
            placeholder='John'
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>

        <FormControl my={3} id='lastName' isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input
            type='text'
            name='lastName'
            value={lastName}
            placeholder='Doe'
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>

        <Center width='100%'>
          <Button type='submit' colorScheme='teal' m={3}>
            Sign Up
          </Button>
        </Center>
      </form>
    </Center>
  );
}

export default Signup;
