import { createStore } from "redux";
import setSessionReducer from "reducers/setSessionReducer";

function configureStore(state = { rotating: true }) {
  return createStore(setSessionReducer,state);
}

export default configureStore;