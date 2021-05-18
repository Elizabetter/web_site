import React, { useEffect } from 'react';
import PageTemplate from '../PageTemplate';
import { getList } from '../../dataProvider/API';
// eslint-disable-next-line import/named
import { ORDERS } from '../../constants/endpoints';
import OrderTable from '../OrderTable';

export function Orders() {
  const [response, setResponse] = React.useState([]);
  useEffect(() => {
    getList(ORDERS).then(r => {
      setResponse(r.data.content);
    });
  }, []);
  console.log(response);
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
    <PageTemplate header="Заказы">
      <OrderTable
        products={response}
        isSelected={isSelected}
        handleClick={handleClick}
      />
    </PageTemplate>
  );
}
