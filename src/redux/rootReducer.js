import { combineReducers } from "redux";
import chat from "./messages";

const rootReducer = combineReducers({
  chat,
});

export default rootReducer;
