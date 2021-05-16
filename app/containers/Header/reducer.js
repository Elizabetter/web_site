/* eslint-disable no-param-reassign */
import produce from 'immer';
import { getUsersAction } from './actions';
import {
  genericReducer,
  namedListParams,
} from '../../dataProvider/routineUtils';

export const key = 'header';

export const initialState = {
  users: namedListParams('users'),
};

const headerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case getUsersAction.REQUEST:
      case getUsersAction.SUCCESS:
      case getUsersAction.FAILURE:
        genericReducer(state, draft, action, initialState.users.name);
        break;
      default:
        break;
    }
  });

export default headerReducer;
