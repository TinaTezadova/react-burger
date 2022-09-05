import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, ...otherProps }) => {
  const user = useSelector(store => store.auth.user);
  return (
    <Route
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
      {...otherProps}
    />
  );

}