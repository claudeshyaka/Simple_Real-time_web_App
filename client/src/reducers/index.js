import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import factoriesReducer from "./factoriesReducer";
import rootReducer from "./rootReducer";

export default combineReducers({
  root: rootReducer,
  form: formReducer,
  factories: factoriesReducer
});
