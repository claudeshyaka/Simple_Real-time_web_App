import _ from "lodash";

import {
  GET_FACTORIES,
  GET_FACTORY,
  CREATE_FACTORY,
  EDIT_FACTORY,
  DELETE_FACTORY
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_FACTORIES:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case GET_FACTORY:
      return { ...state, [action.payload._id]: action.payload };

    case CREATE_FACTORY:
      return { ...state, [action.payload._id]: action.payload };

    case EDIT_FACTORY:
      return { ...state, [action.payload._id]: action.payload };

    case DELETE_FACTORY:
      return _.omit(state, action.payload);

    default:
      return state;
  }
};
