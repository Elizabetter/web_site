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
    const API_ENDPOINT = id => `http://localhost:8080/product/${id}`;
    const request = new XMLHttpRequest();
    const formDataFile = new FormData();
    const { photo, title, description, category, price } = data;
    formDataFile.append('file', photo);
    create(ADD, { title, description, category, price }).then(r => {
      request.open('PUT', API_ENDPOINT(r.entity), true);
      request.send(formDataFile);
    });
  };

  return (
    <PageTemplate header="Создать товар">
      <div className={classes.paper}>
        <AddProductForm onSubmit={onEditUserFormSubmit} />
      </div>
    </PageTemplate>
  );
}
