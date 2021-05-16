import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { useAuthDataContext } from '../../auth/AuthDataProvider';
import { SignIn } from '../../containers/SignIn';

const PrivateRoute = ({ component, ...options }) => {
  const { user } = useAuthDataContext();
  const finalComponent = user ? component : SignIn;

  return <Route {...options} component={finalComponent} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

export default memo(PrivateRoute);
