import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProductTable';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Название',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Описание',
  },
  category: {
    id: `${scope}.category`,
    defaultMessage: 'Категория',
  },
  price: {
    id: `${scope}.price`,
    defaultMessage: 'Цена',
  },
});
