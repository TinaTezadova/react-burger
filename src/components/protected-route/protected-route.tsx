import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

interface IProps {
  children: React.ReactNode,
  path: string
}

export const ProtectedRoute: React.FC<IProps> = ({ children, ...otherProps }) => {
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