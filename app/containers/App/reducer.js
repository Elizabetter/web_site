/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  genericReducer,
  namedEntityParams,
  namedListParams,
} from '../../dataProvider/routineUtils';
import { getManagersAction } from './actions';
import { createAdAction } from '../CreateAd/actions';

export const key = 'global';

export const initialState = {
  managers: namedListParams('managers'),
  statement: namedEntityParams('statement'),
};

const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case getManagersAction.REQUEST:
      case getManagersAction.SUCCESS:
      case getManagersAction.FAILURE:
        genericReducer(state, draft, action, initialState.managers.name);
        break;
      case createAdAction.REQUEST:
      case createAdAction.SUCCESS:
      case createAdAction.FAILURE:
        genericReducer(state, draft, action, initialState.statement.name);
        break;
      default:
        break;
    }
  });

export default homeReducer;
