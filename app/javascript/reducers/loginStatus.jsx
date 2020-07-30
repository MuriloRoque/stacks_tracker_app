import * as types from '../constants/actionTypes';

const initialState = 'NOT_LOGGED_IN';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return 'LOGGED_IN';
    case types.LOGOUT:
      return 'NOT_LOGGED_IN';
    default:
      return state;
  }
};
