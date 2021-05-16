import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PageTemplate from '../PageTemplate';
import contacts from './assets/cotacts.png';

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

export function Contacts() {
  const classes = useStyles();
  return (
    <PageTemplate header="Контакты">
      <div className={classes.root}>
        <img src={contacts} alt={contacts} className={classes.image} />
      </div>
    </PageTemplate>
  );
}
