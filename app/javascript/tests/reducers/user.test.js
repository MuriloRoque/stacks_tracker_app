import user from '../../reducers/user';
import * as types from '../../constants/actionTypes';

describe('user reducer', () => {
  const initialState = {
    email: '', password: '', passwordConfirmation: '', registrationErrors: '', loginErrors: '', userId: 1,
  };
  test('should return the initial state', () => {
    expect(user(undefined, {})).toEqual(initialState);
  });

  test('should handle UPDATE_DATA', () => {
    expect(
      user({}, {
        type: types.UPDATE_DATA,
        name: 'email',
        data: 'murilo@gmail.com',
      }),
    ).toEqual({ email: 'murilo@gmail.com' });

    expect(
      user(
        initialState,
        {
          type: types.UPDATE_DATA,
          name: 'email',
          data: 'murilo@gmail.com',
        },
      ),
    ).toEqual({ ...initialState, email: 'murilo@gmail.com' });
  });

  test('should handle LOGOUT', () => {
    expect(
      user([{ email: 'murilo@gmail.com', password: '123456' }], {
        type: types.LOGOUT,
      }),
    ).toEqual(initialState);

    expect(
      user({ ...initialState, email: 'murilo@gmail.com' },
        {
          type: types.LOGOUT,
        }),
    ).toEqual(initialState);
  });
});
