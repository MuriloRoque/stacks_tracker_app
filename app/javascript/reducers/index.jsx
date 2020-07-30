import { combineReducers } from 'redux';
import loginStatus from './loginStatus';
import user from './user';
import stacks from './stacks';

export default combineReducers({
  loginStatus,
  user,
  stacks
});