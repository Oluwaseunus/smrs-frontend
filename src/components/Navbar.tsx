import React from 'react';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { Link as RouteLink, useLocation } from 'react-router-dom';
import { HStack, Button, Link } from '@chakra-ui/react';
import UserActionsCreator from '../store/actions/user';

function Navbar() {
  const { pathname } = useLocation();
  const { _id = '' } = useSelector((state: RootState) => state.user);

  if (!_id || ['/login', '/signup'].includes(pathname)) {
    return null;
  }

  return (
    <HStack
      height={20}
      justifyContent='flex-end'
      alignItems='center'
      padding={5}
      spacing={5}
    >
      <Link as={RouteLink} to='/home'>
        Home
      </Link>

      <Link as={RouteLink} to='/watchlist'>
        WatchList
      </Link>

      <Button
        variant='outline'
        onClick={() => {
          UserActionsCreator.unauthenticate();
        }}
      >
        Logout
      </Button>
    </HStack>
  );
}

export default Navbar;
