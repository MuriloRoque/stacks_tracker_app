import * as types from '../constants/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FEED_STACKS:
      return [...action.data];
    default:
      return state;
  }
};
