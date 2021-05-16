/*
 * This contains all generic text
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.App';

export default defineMessages({
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Отменить',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Сохранить',
  },
  saveDraft: {
    id: `${scope}.saveDraft`,
    defaultMessage: 'Сохранить черновик',
  },
});
