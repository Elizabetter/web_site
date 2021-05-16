import produce from 'immer';
import {
  genericReducer,
  namedEntityParams,
} from '../../dataProvider/routineUtils';
import { createAdAction } from './actions';

export const key = 'createStatement';

export const initialState = {
  newAd: namedEntityParams('newAd'),
};

const createStatementReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case createAdAction.REQUEST:
      case createAdAction.SUCCESS:
      case createAdAction.FAILURE:
        genericReducer(state, draft, action, initialState.newAd.name);
        break;
      default:
        break;
    }
  });

export default createStatementReducer;
