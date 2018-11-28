import { combineReducers } from 'redux';
import saved from './saved';
import search from './search';

export default combineReducers({
  saved,
  search
})