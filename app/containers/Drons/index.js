import React, { useEffect } from 'react';
import PageTemplate from '../PageTemplate';
import { getList } from '../../dataProvider/API';
import { RACER_DRONES } from '../../constants/endpoints';
import ProductCard from '../../components/ProductCard';

export function Drones() {
  const [response, setResponse] = React.useState([]);
  useEffect(() => {
    getList(RACER_DRONES).then(r => {
      setResponse(r.data.content);
    });
  }, []);

  const productCards = response ? (
    response.map(product => <ProductCard product={product} />)
  ) : (
    <p>Нет товаров</p>
  );

  return <PageTemplate header="Гоночные дроны">{productCards}</PageTemplate>;
}
