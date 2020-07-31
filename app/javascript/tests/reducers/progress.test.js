import progress from '../../reducers/progress';
import * as types from '../../constants/actionTypes';

describe('progress reducer', () => {
  const initialState = {
    total_hours: 0, total_hours_goal: 0, total_projects: 0, total_projects_goal: 0,
  };
  test('should return the initial state', () => {
    expect(progress(undefined, {})).toEqual(initialState);
  });

  test('should handle FEED_PROGRESS', () => {
    expect(
      progress({}, {
        type: types.FEED_PROGRESS,
        data: {
          total_hours: 1000,
          total_hours_goal: 1000,
          total_projects: 1000,
          total_projects_goal: 1000,
        },
      }),
    ).toEqual({
      total_hours: 1000,
      total_hours_goal: 1000,
      total_projects: 1000,
      total_projects_goal: 1000,
    });

    expect(
      progress(
        initialState,
        {
          type: types.FEED_PROGRESS,
          data: {
            total_hours: 1000,
            total_hours_goal: 1000,
            total_projects: 1000,
            total_projects_goal: 1000,
          },
        },
      ),
    ).toEqual({
      total_hours: 1000,
      total_hours_goal: 1000,
      total_projects: 1000,
      total_projects_goal: 1000,
    });
  });
});
