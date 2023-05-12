import { bindActionCreators } from "redux";
import { store } from "./store";
import * as userAction from "./userAuth/userAuthAction";
const actions = {
    ...userAction
  };
  
  export default bindActionCreators(actions, store.dispatch);
  