import React, { useEffect } from 'react';
import PageTemplate from '../PageTemplate';
import { CAMERAS } from '../../constants/endpoints';
import { getList } from '../../dataProvider/API';
import ProductCard, { useStyles } from '../../components/ProductCard';

export function Cameras() {
  const classes = useStyles();
  const [response, setResponse] = React.useState([]);
  useEffect(() => {
    getList(CAMERAS).then(r => {
      setResponse(r.data);
    });
  }, []);

  const productCards = response ? (
    response.map(product => <ProductCard product={product} />)
  ) : (
    <p>Нет товаров</p>
  );

  return (
    <PageTemplate header="Камеры для дронов">
      <div className={classes.final}>{productCards}</div>
    </PageTemplate>
  );
}
