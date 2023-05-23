import { combineReducers } from 'redux'
import userReducer from './userAuth/userAuthReducer';
import categoryReducer from './category/categoryReducer';
import courseReducer from './course/courseReducer';
import topicReducer from './topic/topicReducer';
import contentReducer from './content/contentReducer';

export default combineReducers({
  userRes: userReducer,
  categoryRes: categoryReducer,
  courseRes: courseReducer,
  topicRes: topicReducer,
  contentRes: contentReducer
});