import history from "../history";
import {
  ROOT_NAME,
  CREATE_FACTORY,
  GET_FACTORIES,
  GET_FACTORY,
  EDIT_FACTORY,
  DELETE_FACTORY
} from "./types";

export const getRootName = socket => {
  return dispatch => {
    socket.emit("fetch_root");
    socket.on("fetched_root", res => {
      dispatch({ type: ROOT_NAME, payload: res });
    });
  };
};

export const createFactory = (socket, formValues) => {
  return dispatch => {
    socket.emit("create_factory", formValues);
    socket.on("created_factory", res => {
      dispatch({ type: CREATE_FACTORY, payload: res });
      history.push("/");
    });
  };
};

export const getFactories = socket => {
  return dispatch => {
    socket.emit("fetch_factories");
    socket.on("fetched_factories", res => {
      dispatch({ type: GET_FACTORIES, payload: res });
    });
  };
};

export const getFactory = (socket, id) => {
  return dispatch => {
    socket.emit("fetch_factory", id);
    socket.on("fetched_factory", res => {
      dispatch({ type: GET_FACTORY, payload: res });
    });
  };
};

export const editFactory = (socket, id, formValues) => {
  return dispatch => {
    socket.emit("edit_factory", { id, formValues });
    socket.on("edited_factory", res => {
      dispatch({ type: EDIT_FACTORY, payload: res });
      history.push("/");
    });
  };
};

export const deleteFactory = (socket, id) => {
  return dispatch => {
    socket.emit("delete_factory", id);
    socket.on("deleted_factory", res => {
      dispatch({ type: DELETE_FACTORY, payload: res });
      history.push("/");
    });
  };
};
