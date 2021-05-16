import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import first from './assets/1.svg';
import second from './assets/2.svg';
import third from './assets/3.svg';
import fourth from './assets/4.svg';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 50,
    marginLeft: '13%',
    marginRight: '10%',
    display: 'flex',
  },
  card: {
    maxWidth: 255,
    marginLeft: 20,
    marginRight: 20,
    flexGrow: 1,
    textAlign: 'center',
  },
  title: {
    color: '#111',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 16,
  },
  image: {
    height: 55,
    width: 55,
  },
}));

export const Cards = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <img src={first} alt={first} className={classes.image} />
        <div>
          <h3>Тест-драйв</h3>
          <div>Бесплатный Тест-драйв в Минске перед покупкой </div>
        </div>
      </div>
      <div className={classes.card}>
        <img src={second} alt={second} className={classes.image} />
        <div>
          <h3>Обучение полёту</h3>
          <div>
            Бесплатное 3-ех часовое обучение полету и настройке, при покупке
          </div>
        </div>
      </div>
      <div className={classes.card}>
        <img src={third} alt={third} className={classes.image} />
        <div>
          <h3>Доставка</h3>
          <div>Бесплатная доставка за 1-2 дня до двери по всей Беларуси</div>
        </div>
      </div>
      <div className={classes.card}>
        <img src={fourth} alt={fourth} className={classes.image} />
        <div>
          <h3>Гарантия</h3>
          <div>Сервисный центр по ремонту DJI. Гарантия 12 месяцев</div>
        </div>
      </div>
    </div>
  );
};
