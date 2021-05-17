import React, { useEffect } from 'react';
import PageTemplate from '../PageTemplate';
import { getList } from '../../dataProvider/API';
import { RACER_DRONES } from '../../constants/endpoints';
import ProductCard, { useStyles } from '../../components/ProductCard';

export function Drones() {
  const classes = useStyles();
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

  return (
    <PageTemplate header="Гоночные дроны">
      <div className={classes.final}>{productCards}</div>
    </PageTemplate>
  );
}
