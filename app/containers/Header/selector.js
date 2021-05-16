import { createSelector } from 'reselect';
import { initialState, key } from './reducer';
import { selectListData } from '../App/selectors';

const selectHeaderDomain = state => state[key] || initialState;

const selectHeaderUsers = () =>
  createSelector(
    selectListData(selectHeaderDomain, initialState.users.name),
    data => data,
  );

export { selectHeaderDomain, selectHeaderUsers };
