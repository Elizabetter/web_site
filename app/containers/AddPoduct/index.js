import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import AddProductForm from '../AddProductForm';
import PageTemplate from '../PageTemplate';
import { create } from '../../dataProvider/API';
import { ADD } from '../../constants/endpoints';
import { routes } from '../../constants/routes';

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
  const history = useHistory();

  const onEditUserFormSubmit = ({ ...data }) => {
    const API_ENDPOINT = id => `http://localhost:8080/product/${id}`;
    const request = new XMLHttpRequest();
    const formDataFile = new FormData();
    const { photo, title, description, category, price } = data;
    formDataFile.append('file', photo);
    create(ADD, { title, description, category, price })
      .then(r => {
        request.open('PUT', API_ENDPOINT(r.entity), true);
        request.send(formDataFile);
      })
      // eslint-disable-next-line no-unused-vars
      .then(r => history.push(routes.PRODUCTS));
  };

  return (
    <PageTemplate header="Создать товар">
      <div className={classes.paper}>
        <AddProductForm onSubmit={onEditUserFormSubmit} />
      </div>
    </PageTemplate>
  );
}
