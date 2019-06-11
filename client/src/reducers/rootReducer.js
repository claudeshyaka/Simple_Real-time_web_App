import { ROOT_NAME } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case ROOT_NAME:
      return action.payload;
    default:
      return state;
  }
};
