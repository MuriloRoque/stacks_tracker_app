import stack from '../../reducers/stack';
import * as types from '../../constants/actionTypes';

describe('stack reducer', () => {
  const initialState = {
    name: '', hours: 0, hoursGoal: 0, projects: 0, projectsGoal: 0, createErrors: '', userId: 0,
  };
  test('should return the initial state', () => {
    expect(stack(undefined, {})).toEqual(initialState);
  });

  test('should handle CREATE_STACK', () => {
    expect(
      stack({}, {
        type: types.CREATE_STACK,
        name: 'hours',
        data: 5,
      }),
    ).toEqual({ hours: 5 });

    expect(
      stack(
        initialState,
        {
          type: types.CREATE_STACK,
          name: 'hours',
          data: 5,
        },
      ),
    ).toEqual({ ...initialState, hours: 5 });
  });
});
