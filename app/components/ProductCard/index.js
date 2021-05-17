import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useAuthDataContext } from '../../auth/AuthDataProvider';
import { alertType, roleTypes } from '../../constants/api';
import {
  ADD_PRODUCTS,
  DELETE_PRODUCTS,
  USERS_ID,
} from '../../constants/endpoints';
import { updateOne } from '../../dataProvider/API';
import CustomizedSnackbars from '../Alert';

export const useStyles = makeStyles(() => ({
  root: {
    width: 280,
    height: 150,
    margin: 40,
    padding: 30,
    backgroundColor: '#808080',
  },
  box: {
    width: 200,
    textAlign: 'center',
  },
  final: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(4)',
  },
  title: {
    marginTop: -10,
    color: 'white',
  },
  content: {
    color: 'white',
  },
  price: {
    color: 'white',
    fontSize: 25,
  },
  currency: {
    color: 'white',
    marginLeft: 5,
    marginTop: 10,
  },
  cost: {
    color: 'white',
    margin: 10,
    marginLeft: -2,
    marginTop: 10,
    display: 'flex',
  },
  contentDate: {
    color: 'white',
    marginTop: 10,
  },
  delete: {
    marginTop: 17,
    color: 'white',
    height: 30,
  },
  add: {
    marginTop: 17,
    marginLeft: -5,
    backgroundColor: 'white',
    color: 'black',
    height: 30,
    '&:hover': {
      backgroundColor: 'grey',
      color: 'black',
    },
  },
  icon: {
    marginTop: -4,
    marginLeft: 10,
    color: 'black',
  },
  block: {
    display: 'flex',
  },
}));

function ProductCard({ product, cart }) {
  const classes = useStyles();
  const { user } = useAuthDataContext();
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
        <div className={classes.box}>
          <h2 className={classes.title}>{product.title}</h2>
        </div>
        <div className={classes.content}>{product.description}</div>
        <div className={classes.cost}>
          <div className={classes.price}>{product.price}</div>
          <div className={classes.currency}>бел.руб.</div>
        </div>
        {role === roleTypes.USER && !cart && (
          <Button
            className={classes.add}
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
            Положить в корзину
            <ShoppingCartIcon className={classes.icon} fontSize="small" />
          </Button>
        )}
        {role === roleTypes.USER && cart && (
          <Button
            className={classes.add}
            onClick={() => {
              updateOne(USERS_ID(user.id), DELETE_PRODUCTS(product.id)).then(
                // eslint-disable-next-line no-return-assign,no-unused-vars
                r => (window.location = window.location.href),
              );
            }}
          >
            Удалить из корзины
            <ShoppingCartIcon className={classes.icon} fontSize="small" />
          </Button>
        )}
      </Card>
    </Grid>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
  cart: PropTypes.bool,
};

export default ProductCard;
