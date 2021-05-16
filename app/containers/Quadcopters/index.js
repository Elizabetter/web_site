import React, { useEffect } from 'react';
import PageTemplate from '../PageTemplate';
import { getList } from '../../dataProvider/API';
import { DRONES } from '../../constants/endpoints';
import ProductCard, { useStyles } from '../../components/ProductCard';

export function Quadcopters() {
  const classes = useStyles();
  const [response, setResponse] = React.useState([]);
  useEffect(() => {
    getList(DRONES).then(r => {
      setResponse(r.data.content);
    });
  }, []);
  const productCards = response ? (
    response.map(product => <ProductCard product={product} />)
  ) : (
    <p>Нет товаров</p>
  );

  return (
    <PageTemplate header="Квадрокоптеры">
      <div className={classes.final}>{productCards}</div>
    </PageTemplate>
  );
}
