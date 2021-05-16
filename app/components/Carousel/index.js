import React from 'react';
import Slide from 'react-reveal/Slide';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';
import first from './assets/1.png';
import second from './assets/2.jpg';
import third from './assets/3.jpg';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    textAlign: 'center',
  },
  title: {
    color: '#111',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 16,
  },
  image: {
    width: '100%',
  },
}));

export const Slider = () => {
  const classes = useStyles();
  return (
    <Carousel interval={6000} className={classes.root}>
      <Slide right>
        <div>
          <img src={first} alt={first} className={classes.image} />
        </div>
      </Slide>
      <Slide right>
        <div>
          <img src={second} alt={second} className={classes.image} />
        </div>
      </Slide>
      <Slide right>
        <div>
          <img src={third} alt={third} className={classes.image} />
        </div>
      </Slide>
    </Carousel>
  );
};
