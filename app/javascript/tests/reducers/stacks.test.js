import stacks from '../../reducers/stacks';
import * as types from '../../constants/actionTypes';

describe('stacks reducer', () => {
  const initialState = [];
  test('should return the initial state', () => {
    expect(stacks(undefined, {})).toEqual(initialState);
  });

  test('should handle FEED_STACKS', () => {
    expect(
      stacks({}, {
        type: types.FEED_STACKS,
        data: [{
          name: 'Ruby', hours: 5, hoursGoal: 5, projects: 5, projectsGoal: 5,
        }],
      }),
    ).toEqual([{
      name: 'Ruby', hours: 5, hoursGoal: 5, projects: 5, projectsGoal: 5,
    }]);

    expect(
      stacks(
        initialState,
        {
          type: types.FEED_STACKS,
          data: [{
            name: 'Ruby', hours: 5, hoursGoal: 5, projects: 5, projectsGoal: 5,
          }],
        },
      ),
    ).toEqual([...initialState, {
      name: 'Ruby', hours: 5, hoursGoal: 5, projects: 5, projectsGoal: 5,
    }]);
  });
});
