import * as types from '../constants/actionTypes';

export const updateData = (name, data) => ({
  type: types.UPDATE_DATA,
  name,
  data,
});

export const resetData = () => ({
  type: types.LOGOUT,
});

export const login = () => ({
  type: types.LOGIN,
});

export const logout = () => ({
  type: types.LOGOUT,
});
