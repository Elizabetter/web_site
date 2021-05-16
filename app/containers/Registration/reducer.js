import produce from 'immer';
import {
  genericReducer,
  namedListParams,
} from '../../dataProvider/routineUtils';
import { registrationAction } from './actions';

export const key = 'registration';

export const initialState = {
  registration: namedListParams('registration'),
};

const redistrationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case registrationAction.REQUEST:
      case registrationAction.SUCCESS:
      case registrationAction.FAILURE:
        genericReducer(state, draft, action, initialState.registration.name);
        break;
      default:
        break;
    }
  });

export default redistrationReducer;
