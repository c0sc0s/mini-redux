import { validateReducers } from "./utils";

export default function (reducers) {
  try {
    validateReducers(reducers);
    return function (state = {}, action) {
      const newState = {};
      Object.keys(reducers).forEach((key) => {
        newState[key] = reducers[key](state[key], action);
      });
      return newState;
    };
  } catch (e) {
    console.warn(e.message);
  }
}
