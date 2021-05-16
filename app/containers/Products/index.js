import React, { useEffect } from 'react';
import PageTemplate from '../PageTemplate';
import { getList } from '../../dataProvider/API';
// eslint-disable-next-line import/named
import { PRODUCTS } from '../../constants/endpoints';
import ProductTable from '../ProductTable';

export function Products() {
  const [response, setResponse] = React.useState([]);
  useEffect(() => {
    getList(PRODUCTS).then(r => {
      setResponse(r.data.content);
    });
  }, []);
  const [selected, setSelected] = React.useState([]);
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
  const isSelected = name => selected.indexOf(name) !== -1;

  return (
    <PageTemplate header="Товары">
      <ProductTable
        products={response}
        isSelected={isSelected}
        handleClick={handleClick}
      />
    </PageTemplate>
  );
}
