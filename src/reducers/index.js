import { combineReducers } from 'redux';
import user from './user';
import posts from './posts';
import post from './post';

const rootReducer = combineReducers({
  user,
  posts,
  post
});

export default rootReducer;