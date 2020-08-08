import * as types from '../constants/actionTypes';

const initialState = {
  email: '', password: '', passwordConfirmation: '', registrationErrors: '', loginErrors: '', userId: 1,
};

export default (state = initialState, action) => {
  const key = action.name;
  switch (action.type) {
    case types.UPDATE_DATA:
      return { ...state, [key]: action.data };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
