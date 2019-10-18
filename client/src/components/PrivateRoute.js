import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rests }) => {
    console.log(rests)
  return (
    <Route
      {...rests}
      render={props => {
        if (localStorage.getItem('token')) {
          return <Component {...props} {...rests}/>;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;