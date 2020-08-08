import {
  updateData, resetData, login, logout, feedStacks, feedProgress, createStack,
} from '../../actions/index';
import * as types from '../../constants/actionTypes';

describe('actions', () => {
  test('should create an action to update User data', () => {
    const name = 'email';
    const data = 'murilo@gmail.com';
    const expectedAction = {
      type: types.UPDATE_DATA,
      name,
      data,
    };
    expect(updateData(name, data)).toEqual(expectedAction);
  });

  test('should create an action to reset User data', () => {
    const expectedAction = {
      type: types.LOGOUT,
    };
    expect(resetData()).toEqual(expectedAction);
  });

  test('should create an action to login', () => {
    const expectedAction = {
      type: types.LOGIN,
    };
    expect(login()).toEqual(expectedAction);
  });

  test('should create an action to logout', () => {
    const expectedAction = {
      type: types.LOGOUT,
    };
    expect(logout()).toEqual(expectedAction);
  });

  test('should create an action to feed Stacks', () => {
    const data = [];
    const expectedAction = {
      type: types.FEED_STACKS,
      data,
    };
    expect(feedStacks(data)).toEqual(expectedAction);
  });

  test('should create an action to feed Progress', () => {
    const data = [];
    const expectedAction = {
      type: types.FEED_PROGRESS,
      data,
    };
    expect(feedProgress(data)).toEqual(expectedAction);
  });

  test('should create an action to create stack', () => {
    const name = 'hours';
    const data = 10;
    const expectedAction = {
      type: types.CREATE_STACK,
      name,
      data,
    };
    expect(createStack(name, data)).toEqual(expectedAction);
  });
});
