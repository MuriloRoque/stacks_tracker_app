import * as types from '../constants/actionTypes';

const initialState = { email: '', password: '', passwordConfirmation: '', registrationErrors: ''};

export default (state = initialState, action) => {
  switch(action.type) {
    case types.UPDATE_DATA:
      const key = action.name
      return { ...state, [key]: action.data}
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
