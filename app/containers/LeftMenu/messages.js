/*
 * menu Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LeftMenu';

export default defineMessages({
  catalog: {
    id: `${scope}.catalog`,
    defaultMessage: 'Каталог',
  },
  create: {
    id: `${scope}.create`,
    defaultMessage: 'Создать объявление',
  },
  usersAds: {
    id: `${scope}.usersAds`,
    defaultMessage: 'Мои объявления',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Плюшкин',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Выйти',
  },
  profile: {
    id: `${scope}.profile`,
    defaultMessage: 'Мой профиль',
  },
});
