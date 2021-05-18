import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProductTable';

export default defineMessages({
  id: {
    id: `${scope}.id`,
    defaultMessage: 'id',
  },
  number: {
    id: `${scope}.number`,
    defaultMessage: 'Номер телефона',
  },
  products: {
    id: `${scope}.products`,
    defaultMessage: 'Перечень товаров',
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: 'Адрес',
  },
  price: {
    id: `${scope}.price`,
    defaultMessage: 'Цена',
  },
});
