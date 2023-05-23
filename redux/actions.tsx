import { bindActionCreators } from "redux";
import { store } from "./store";
import * as userAction from "./userAuth/userAuthAction";
import * as categoryAction from './category/categoryAction';
import * as courseAction from './course/courseAction';
import * as topicAction from './topic/topicAction';
import * as contentAction from './content/contentAction';

const actions = {
    ...userAction,
    ...categoryAction,
    ...courseAction,
    ...topicAction,
    ...contentAction
  };
  
  export default bindActionCreators(actions, store.dispatch);
  