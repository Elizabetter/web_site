import { createRoutine } from 'redux-saga-routines';
import { SIGN_IN } from './constants';

export const signInAction = createRoutine(SIGN_IN);
