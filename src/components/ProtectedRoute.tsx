import React from 'react';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

function ProtectedRoute(props: RouteProps) {
  const user = useSelector((state: RootState) => state.user);

  if (!user._id) return <Redirect to='/login' />;

  return <Route {...props} />;
}

export default ProtectedRoute;
