// import { call, takeEvery } from 'redux-saga/effects';
// import { createEntitySaga } from '../App/saga';
// import { REGISTRATION } from '../../constants/endpoints';
// import { registrationAction } from './actions';
//
// export function* registrationSaga({ payload }) {
//   const { params } = payload;
//   const listPayload = {
//     endpoint: REGISTRATION,
//     sagaRoutine: registrationAction,
//     params: { params },
//   };
//   yield call(createEntitySaga, { payload: listPayload });
// }
//
// export default function* headerSaga() {
//   yield takeEvery(registrationAction.TRIGGER, registrationSaga);
// }
