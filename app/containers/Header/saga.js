import { call, takeEvery } from 'redux-saga/effects';
import { getListSaga } from '../App/saga';
import { USERS } from '../../constants/endpoints';
import { getUsersAction } from './actions';

export function* getUsersSaga() {
  const payload = {
    endpoint: USERS,
    sagaRoutine: getUsersAction,
  };
  yield call(getListSaga, { payload });
}

export default function* headerSaga() {
  yield takeEvery(getUsersAction.TRIGGER, getUsersSaga);
}
