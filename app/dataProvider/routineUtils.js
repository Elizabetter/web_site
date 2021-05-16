import {
  FAILURE,
  REQUEST,
  SUCCESS,
} from 'redux-saga-routines/dist/routineStages';
import { get } from 'lodash';

export const defaultPagination = {
  page: 1,
  limit: 10,
  total: 0,
};

const statusParams = {
  loading: false,
  loadedOnce: false,
  error: null,
};

const defaultListParams = {
  data: [],
  ...defaultPagination,
  ...statusParams,
};

const defaultEntityParams = {
  entity: {},
  ...statusParams,
};

export const namedListParams = name => ({
  ...defaultListParams,
  name,
});

export const namedEntityParams = name => ({
  ...defaultEntityParams,
  name,
});

export const formatResponseToList = response => ({
  page: get(response, 'data.page', defaultListParams.page),
  limit: parseInt(get(response, 'data.limit', defaultListParams.limit), 10),
  total: parseInt(get(response, 'data.total', defaultListParams.total), 10),
  data: response || defaultListParams.data,
});

export const formatResponseToEntity = response => ({
  entity: response || defaultEntityParams.entity,
});

export const genericReducer = (state, draft, action, listName) => {
  const { type, payload } = action;
  const routingStage = type.split('/').pop();
  switch (routingStage) {
    case REQUEST:
      // eslint-disable-next-line no-param-reassign
      draft[listName] = { ...state[listName], loading: true, error: null };
      break;
    case SUCCESS:
      // eslint-disable-next-line no-param-reassign
      draft[listName] = {
        ...state[listName],
        ...payload,
        loading: false,
        loadedOnce: true,
      };
      break;
    case FAILURE:
      // eslint-disable-next-line no-param-reassign
      draft[listName] = { ...state[listName], loading: false, error: payload };
      break;
    default:
      break;
  }
};
