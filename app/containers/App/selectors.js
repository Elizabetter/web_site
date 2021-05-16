import { createSelector } from 'reselect';
import get from 'lodash/get';
// import { useSelector } from 'react-redux';
import { initialState, key } from './reducer';

const selectGlobal = state => state[key] || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const selectManagers = () =>
  createSelector(
    selectListData(selectGlobal, initialState.managers.name),
    data => data,
  );

const selectList = (domain, listName) =>
  createSelector(
    domain,
    subState => get(subState, listName),
  );
const selectListData = (domain, listName) =>
  createSelector(
    selectList(domain, listName),
    list => get(list, 'data'),
  );
const selectListLoading = (domain, listName) =>
  createSelector(
    selectList(domain, listName),
    list => get(list, 'loading'),
  );

export {
  makeSelectLocation,
  selectList,
  selectListData,
  selectListLoading,
  selectManagers,
};
