import React from 'react';
import PropTypes from 'prop-types';
import { routes } from 'constants/routes';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { colors } from '../../constants/styles';

const useStyles = makeStyles({
  logo: {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: 18,
    width: 180,
    color: colors.white,
  },
});

const Logo = ({ className }) => {
  const classes = useStyles();
  return (
    <div className={cn(classes.logo, className)}>
      <Link to={routes.HOME}>LOGO</Link>
    </div>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
