import { createRoutine } from 'redux-saga-routines';
import { CREATE_AD } from './constants';

export const createAdAction = createRoutine(CREATE_AD);
