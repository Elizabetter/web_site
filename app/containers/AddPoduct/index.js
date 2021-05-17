import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddProductForm from '../AddProductForm';
import PageTemplate from '../PageTemplate';
import { create } from '../../dataProvider/API';
import { ADD } from '../../constants/endpoints';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: '#000000',
  },
  form: {
    width: 400,
  },
}));

export function AddProduct() {
  const classes = useStyles();

  const onEditUserFormSubmit = ({ ...data }) => {
    // e.preventDefault();
    create(ADD, data);
  };

  return (
    <PageTemplate header="Создать товар">
      <div className={classes.paper}>
        <AddProductForm onSubmit={onEditUserFormSubmit} />
      </div>
    </PageTemplate>
  );
}
