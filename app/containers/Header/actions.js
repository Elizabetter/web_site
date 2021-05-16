import { createRoutine } from 'redux-saga-routines';
import { GET_USERS, CHECK_ACTIVE_USER } from './constants';

export const getUsersAction = createRoutine(GET_USERS);

export const checkActiveUserAction = () => ({
  type: CHECK_ACTIVE_USER,
});
