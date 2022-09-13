import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export const ProtectedRoute = ({ children, ...otherProps }) => {
  const tokenExpired = getCookie('accessToken') ? false : true;
  
  return (
    <Route
      render={({ location }) =>
      !tokenExpired ? (
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