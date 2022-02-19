import { combineReducers } from "redux";
import user from "./user";
import columns from "./columns";
import columnRankings from "./columnRankings";
import debates from "./debates";
import debateRankings from "./debateRankings";

const rootReducer = combineReducers({
  user,
  columns,
  columnRankings,
  debates,
  debateRankings,
});

export default rootReducer;
