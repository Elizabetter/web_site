import React, { useEffect } from 'react';
import PageTemplate from '../PageTemplate';
import { getList } from '../../dataProvider/API';
import { CART } from '../../constants/endpoints';
import { useAuthDataContext } from '../../auth/AuthDataProvider';
import { SaveButton } from '../../components/Buttons';
import Confirm from '../Confirm';
import ProductCard from '../../components/ProductCard';

export function Cart() {
  const { user } = useAuthDataContext();
  const [response, setResponse] = React.useState([]);
  useEffect(() => {
    getList(CART(user.id)).then(r => {
      setResponse(r.data.products);
    });
  }, []);

  const productCards = response ? (
    response.map(product => <ProductCard cart product={product} />)
  ) : (
    <p>Нет товаров</p>
  );

  return (
    <PageTemplate header="Корзина">
      {productCards}
      <br />
      {response.products && (
        <Confirm
          id={response.id}
          accountId={response.accountId}
          amount={response.amount}
        >
          <SaveButton>Оформить заказ</SaveButton>
        </Confirm>
      )}
    </PageTemplate>
  );
}
