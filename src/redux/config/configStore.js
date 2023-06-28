import { createStore } from 'redux';
import { combineReducers } from 'redux';
import posts from '../modules/posts';

const rootReducer = combineReducers({
  posts
});
const store = createStore(rootReducer);

export default store;
