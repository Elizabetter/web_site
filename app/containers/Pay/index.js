import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import image from './assets/DostavkaAndOpl.png';
import PageTemplate from '../PageTemplate';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  image: {
    width: '90%',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
}));

export function Pay() {
  const classes = useStyles();
  return (
    <PageTemplate header="Доставка и оплата">
      <div className={classes.root}>
        <img src={image} alt={image} className={classes.image} />
      </div>
    </PageTemplate>
  );
}
