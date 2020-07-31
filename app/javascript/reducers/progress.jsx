import * as types from '../constants/actionTypes';

const initialState = { total_hours: 0, total_hours_goal: 0, total_projects: 0, total_projects_goal: 0};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FEED_PROGRESS:
      return action.data;
    default:
      return state;
  }
};
