import React from 'react';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { Flex, Button } from '@chakra-ui/react';
import UserActionsCreator from '../store/actions/user';

function Navbar() {
  const { _id = '' } = useSelector((state: RootState) => state.user);

  if (!_id) return null;

  return (
    <Flex height={10} justifyContent='flex-end' padding={5}>
      <Button
        variant='outline'
        onClick={() => {
          UserActionsCreator.unauthenticate();
        }}
      >
        Logout
      </Button>
    </Flex>
  );
}

export default Navbar;
