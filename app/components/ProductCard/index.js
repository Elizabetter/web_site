import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { useHistory } from 'react-router-dom';
import { useAuthDataContext } from '../../auth/AuthDataProvider';
import { alertType, roleTypes } from '../../constants/api';
import {
  ADD_PRODUCTS,
  DELETE_PRODUCTS,
  USERS_ID,
} from '../../constants/endpoints';
import { updateOne } from '../../dataProvider/API';
import CustomizedSnackbars from '../Alert';
import { routes } from '../../constants/routes';

export const useStyles = makeStyles(() => ({
  root: {
    width: 400,
    minHeight: 200,
    margin: 40,
    padding: 30,
    backgroundColor: 'black',
  },
  final: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3)',
  },
  title: {
    marginTop: -20,
    color: 'white',
    display: 'flex',
  },
  content: {
    color: 'white',
    marginTop: -10,
    margin: 10,
    width: '50%',
  },
  contentDate: {
    color: 'white',
    margin: 10,
  },
  delete: {
    marginTop: 17,
    color: 'white',
    height: 30,
  },
  icon: {
    marginTop: -4,
    marginLeft: -10,
    color: 'white',
  },
  block: {
    display: 'flex',
  },
}));

function ProductCard({ product, cart }) {
  const classes = useStyles();
  const { user } = useAuthDataContext();
  const history = useHistory();
  let role;
  if (user) {
    // eslint-disable-next-line prefer-destructuring
    role = user.role;
  } else {
    role = 'EMPTY';
  }
  const [showAlert, setShowAlert] = React.useState(false);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  return (
    <Grid item xs={12} sm={12} md={12} lg={6} key={product.id}>
      {showErrorAlert && (
        <CustomizedSnackbars
          message="Повторите попытку."
          status={alertType.ERROR}
        />
      )}
      {showAlert && (
        <CustomizedSnackbars
          message="Товар добавлен в корзину."
          status={alertType.SUCCESS}
        />
      )}
      <Card className={classes.root}>
        <div className={classes.title}>
          <h2>{product.title}</h2>
          {role === roleTypes.USER && !cart && (
            <Button
              className={classes.delete}
              onClick={() => {
                updateOne(USERS_ID(user.id), ADD_PRODUCTS(product.id))
                  // eslint-disable-next-line no-unused-vars
                  .then(r => {
                    setShowAlert(true);
                    setTimeout(function() {
                      setShowAlert(false);
                    }, 5000);
                  })
                  // eslint-disable-next-line no-unused-vars
                  .catch(r => {
                    setShowErrorAlert(true);
                    setTimeout(function() {
                      setShowErrorAlert(false);
                    }, 5000);
                  });
              }}
            >
              <AddCircleIcon fontSize="small" />
            </Button>
          )}
          {role === roleTypes.USER && cart && (
            <Button
              className={classes.delete}
              onClick={() => {
                updateOne(USERS_ID(user.id), DELETE_PRODUCTS(product.id)).then(
                  // eslint-disable-next-line no-unused-vars
                  r => history.push(routes.CART),
                );
              }}
            >
              <RemoveCircleOutlineIcon fontSize="small" />
            </Button>
          )}
        </div>
        <div className={classes.block}>
          <div className={classes.content}>
            <b>Описание:</b> {product.description}
            <br />
            <b>Цена:</b> {product.price} бел.руб.
          </div>
          {/*  /!*<div className={classes.content}>*!/ */}
          {/*  /!*  <b>Номер телефона:</b> {ad.phoneNumber}*!/ */}
          {/*  /!*  <br />*!/ */}
          {/*  /!*  <b>Цена:</b> {ad.price} бел.руб.*!/ */}
          {/*  /!*</div>*!/ */}
        </div>
        {/* <div className={classes.contentDate}> */}
        {/*  <b>Дата создания:</b> {ad.dateOfPlacement} */}
        {/* </div> */}
      </Card>
    </Grid>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
  cart: PropTypes.bool,
};

export default ProductCard;
