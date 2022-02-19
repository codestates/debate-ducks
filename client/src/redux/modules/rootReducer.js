import { combineReducers } from "redux";
import user from "./user";
import columns from "./columns";
import columnRankings from "./columnRankings";

const rootReducer = combineReducers({
  user,
  columns,
  columnRankings,
});

export default rootReducer;
