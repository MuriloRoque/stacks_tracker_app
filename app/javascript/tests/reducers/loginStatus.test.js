import loginStatus from '../../reducers/loginStatus';
import * as types from '../../constants/actionTypes';

describe('loginStatus reducer', () => {
  const initialState = 'NOT_LOGGED_IN';
  test('should return the initial state', () => {
    expect(loginStatus(undefined, {})).toEqual(initialState);
  });

  test('should handle LOGIN', () => {
    expect(
      loginStatus('', {
        type: types.LOGIN,
      }),
    ).toEqual('LOGGED_IN');

    expect(
      loginStatus(
        initialState,
        {
          type: types.LOGIN,
        },
      ),
    ).toEqual('LOGGED_IN');
  });

  test('should handle LOGOUT', () => {
    expect(
      loginStatus('LOGGED_IN', {
        type: types.LOGOUT,
      }),
    ).toEqual(initialState);
  });
});
