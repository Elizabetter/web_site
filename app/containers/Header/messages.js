import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Header';

export default defineMessages({
  users: {
    id: `${scope}.users`,
    defaultMessage: 'Пользователи',
  },
  select: {
    id: `${scope}.select`,
    defaultMessage: 'Выбрать',
  },
});
