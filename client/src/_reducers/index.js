import { combineReducers } from "redux";
import user from "./user_reducer";
import product from "./product";
import chatbot from "./chatbot";

const rootReducer = combineReducers({
  user,
  product,
  chatbot,
});

export default rootReducer;
