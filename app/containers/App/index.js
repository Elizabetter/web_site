/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import reducer, { key } from './reducer';
import { useInjectReducer } from '../../utils/injectReducer';
import { routes } from '../../constants/routes';
import { useAuthDataContext } from '../../auth/AuthDataProvider';
import EmptyPage from '../EmptyPage';
import { SignIn } from '../SignIn';
import { Registration } from '../Registration';
import { Ads } from '../MainContent';
import { Products } from '../Products';
import { Quadcopters } from '../Quadcopters';
// eslint-disable-next-line import/named
import { Sets } from '../Sets';
import { Contacts } from '../Contacts';
import { Cameras } from '../Cameras';
import { Drones } from '../Drons';
import { Pay } from '../Pay';
import { Cart } from '../Cart';
import { Users } from '../Users';
import { Orders } from '../Orders';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function App() {
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  const query = useQuery();
  const queryId = query.get('id');
  const queryToken = query.get('token');
  const { onLogin } = useAuthDataContext();

  useEffect(() => {
    if (queryToken && queryId) {
      onLogin({
        id: queryId,
        token: queryToken,
      });
    }
  }, [queryId, queryToken]);

  return (
    <div>
      <Switch>
        <Route exact path={routes.HOME}>
          <Redirect to={routes.SIGN_IN} />
        </Route>
        <Route path={routes.SIGN_IN} component={SignIn} />
        <Route path={routes.REGISTRATION} component={Registration} />
        <Route path={routes.MAIN} component={Ads} />
        <Route path={routes.EMPTY_PAGE} component={EmptyPage} />
        <Route path={routes.PRODUCTS} component={Products} />
        <Route path={routes.QUADCOPTERS} component={Quadcopters} />
        <Route path={routes.PAY} component={Pay} />
        <Route path={routes.DRONS} component={Drones} />
        <Route path={routes.SETS} component={Sets} />
        <Route path={routes.CONTACTS} component={Contacts} />
        <Route path={routes.CART} component={Cart} />
        <Route path={routes.CAMERAS} component={Cameras} />
        <Route path={routes.CONTACTS} component={Contacts} />
        <Route path={routes.USERS} component={Users} />
        <Route path={routes.ORDERS} component={Orders} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
