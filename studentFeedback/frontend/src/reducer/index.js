import { combineReducers } from "redux";

import user from "./user";
import form from "./form";

export default combineReducers({
  user,
  form,
});
