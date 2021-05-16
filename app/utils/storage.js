const USER_ID_KEY = 'user_id';
const TOKEN = 'token';
const USER = 'user';

const setField = (key, value) => {
  try {
    localStorage.setItem(key, value);
    // eslint-disable-next-line no-empty
  } catch (e) {}
};

const getField = key => localStorage.getItem(key);
const removeField = key => {
  try {
    localStorage.removeItem(key);
    // eslint-disable-next-line no-empty
  } catch (e) {}
};

const setUserId = id => {
  setField(USER_ID_KEY, id);
};
const getUserId = () => getField(USER_ID_KEY);
const removeUserId = () => removeField(USER_ID_KEY);

const setToken = token => setField(TOKEN, token);
const getToken = () => getField(TOKEN);
const removeToken = () => removeField(TOKEN);

const getUser = () => JSON.parse(getField(USER));

const setUser = user => {
  setField(USER, JSON.stringify(user));
};

const clearCurrentUser = () => {
  removeField(USER);
};

const clearUserData = () => {
  removeUserId();
  removeToken();
  clearCurrentUser();
};

export default {
  setUserId,
  getUserId,
  removeUserId,
  setToken,
  getToken,
  removeToken,
  clearUserData,
  getUser,
  setUser,
  clearCurrentUser,
};
