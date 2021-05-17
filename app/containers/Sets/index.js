import React, { useEffect } from 'react';
import PageTemplate from '../PageTemplate';
import { ACCESSORIES } from '../../constants/endpoints';
import { getList } from '../../dataProvider/API';
import ProductCard, { useStyles } from '../../components/ProductCard';

export function Sets() {
  const classes = useStyles();
  const [response, setResponse] = React.useState([]);
  useEffect(() => {
    getList(ACCESSORIES).then(r => {
      setResponse(r.data.content);
    });
  }, []);

  const productCards = response ? (
    response.map(product => <ProductCard product={product} />)
  ) : (
    <p>Нет товаров</p>
  );

  return (
    <PageTemplate header="Комплектующие для дронов">
      <div className={classes.final}>{productCards}</div>
    </PageTemplate>
  );
}
