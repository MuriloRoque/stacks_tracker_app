import * as types from '../constants/actionTypes';

const initialState = {
  name: '', hours: 0, hoursGoal: 0, projects: 0, projectsGoal: 0, createErrors: '', userId: 0,
};

export default (state = initialState, action) => {
  const key = action.name;
  switch (action.type) {
    case types.CREATE_STACK:
      if (key !== 'name' && key !== 'createErrors') {
        return { ...state, [key]: Number(action.data) };
      }
      return { ...state, [key]: action.data };
    default:
      return state;
  }
};
