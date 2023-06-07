import { isPlainObject, INIT, UNKNOW, isFunction } from "./utils";
export default function (reducer, defaultState, enhanced) {
  if (isFunction(defaultState)) {
    enhanced = defaultState;
    defaultState = undefined;
  }

  const currentReducer = reducer;
  let currentState = defaultState;

  const listeners = [];

  function dispatch(action) {
    // 验证action
    if (!isPlainObject(action)) {
      throw new Error("action must be a plain object");
    }
    if (!action.type) {
      throw new Error("action must have a type");
    }
    // 执行reducer
    currentState = currentReducer(currentState, action);

    // 触发 listeners
    listeners.forEach((listener) => listener());
  }

  function getState() {}

  function subscribe(listener) {
    listeners.push(listener);
    return () => listeners.filter((l) => l !== listener);
  }

  dispatch({ type: INIT() });

  return {
    dispatch,
    getState,
    subscribe,
  };
}
