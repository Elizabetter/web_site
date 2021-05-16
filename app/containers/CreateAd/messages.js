import { defineMessages } from 'react-intl';

export const scope = 'app.containers.CreateAd';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Новое заявление',
  },
  vacation: {
    id: `${scope}.vacation`,
    defaultMessage: 'Очередной отпуск',
  },
  dayOff: {
    id: `${scope}.dayOff`,
    defaultMessage: 'Отпуск за свой счёт',
  },
  dayError: {
    id: `${scope}.dayError`,
    defaultMessage: 'выберите корректный период',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Отмена',
  },
  draft: {
    id: `${scope}.draft`,
    defaultMessage: 'Сохранить черновик',
  },
  send: {
    id: `${scope}.send`,
    defaultMessage: 'Отправить на подпись',
  },
  dayFrom: {
    id: `${scope}.dayFrom`,
    defaultMessage: 'С',
  },
  dayTo: {
    id: `${scope}.dayTo`,
    defaultMessage: 'По',
  },
  period: {
    id: `${scope}.period`,
    defaultMessage: 'Продолжительность:',
  },
  departmentManager: {
    id: `${scope}.departmentManager`,
    defaultMessage: 'Руководитель отдела:',
  },
  projectManager: {
    id: `${scope}.projectManager`,
    defaultMessage: 'Проектный менеджер:',
  },
});
