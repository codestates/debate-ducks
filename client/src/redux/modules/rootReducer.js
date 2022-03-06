import { combineReducers } from "redux";
import user from "./user";
import columns from "./columns";
import debates from "./debates";

const rootReducer = combineReducers({
  user,
  columns,
  debates,
});

export default rootReducer;
