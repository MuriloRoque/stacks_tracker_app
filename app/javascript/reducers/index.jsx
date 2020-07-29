import { combineReducers } from 'redux';
import loginStatus from './loginStatus';
import user from './user';

export default combineReducers({
  loginStatus,
  user
});