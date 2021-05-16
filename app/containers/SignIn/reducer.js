import produce from 'immer';
import {
  genericReducer,
  namedListParams,
} from '../../dataProvider/routineUtils';
import { signInAction } from './actions';

export const key = 'signin';

export const initialState = {
  signIn: namedListParams('signIn'),
};

const signInReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case signInAction.REQUEST:
      case signInAction.SUCCESS:
      case signInAction.FAILURE:
        genericReducer(state, draft, action, initialState.signIn.name);
        break;
      default:
        break;
    }
  });

export default signInReducer;
