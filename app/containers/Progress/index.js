import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

const useStylesFacebook = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  box: {
    display: 'flex',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  showTrue: {
    marginLeft: 15,
  },
  showFalse: {
    display: 'none',
  },
  top: {
    color: '#1a90ff',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

// eslint-disable-next-line react/prop-types
export function Progress({ children, loading }) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.box}>
      <div>{children}</div>
      <div className={loading ? classes.showTrue : classes.showFalse}>
        <div className={classes.root}>
          <CircularProgress
            variant="determinate"
            className={classes.bottom}
            size={30}
            thickness={4}
            value={100}
          />
          <CircularProgress
            variant="indeterminate"
            disableShrink
            className={classes.top}
            classes={{
              circle: classes.circle,
            }}
            size={30}
            thickness={4}
          />
        </div>
      </div>
    </div>
  );
}

Progress.propTypes = {
  loading: PropTypes.bool,
};

Progress.defaultProps = {
  loading: false,
};
