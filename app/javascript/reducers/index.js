import { combineReducers } from 'redux';
import loginStatus from './loginStatus';
import user from './user';
import stacks from './stacks';
import stack from './stack';
import progress from './progress';

export default combineReducers({
  loginStatus,
  user,
  stacks,
  stack,
  progress,
});
