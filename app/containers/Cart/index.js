import React, { useEffect } from 'react';
import PageTemplate from '../PageTemplate';
import { getList } from '../../dataProvider/API';
import { CART } from '../../constants/endpoints';
import { useAuthDataContext } from '../../auth/AuthDataProvider';
import { SaveButton } from '../../components/Buttons';
import Confirm from '../Confirm';
import ProductCard, { useStyles } from '../../components/ProductCard';

export function Cart() {
  const classes = useStyles();
  const { user } = useAuthDataContext();
  const [response, setResponse] = React.useState([]);
  useEffect(() => {
    getList(CART(user.id)).then(r => {
      setResponse(r.data);
    });
  }, []);

  const productCards = response.products ? (
    response.products.map(product => <ProductCard cart product={product} />)
  ) : (
    <p>Нет товаров</p>
  );

  return (
    <PageTemplate header="Корзина">
      <div className={classes.final}>{productCards}</div>
      <br />
      {response.products && response.products.length > 0 ? (
        <Confirm
          id={response.id}
          accountId={response.accountId}
          amount={response.amount}
        >
          <SaveButton>Оформить заказ</SaveButton>
        </Confirm>
      ) : (
        <p>Ваша корзина пуста</p>
      )}
    </PageTemplate>
  );
}
