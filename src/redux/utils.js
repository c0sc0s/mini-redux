function isPlainObject(obj) {
  return (
    typeof obj === "object" && Object.getPrototypeOf(obj) === Object.prototype
  );
}

function getRandomString(length) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2)
    .split("")
    .join(".");
}

function isFunction(obj) {
  return typeof obj === "function";
}

function getAutoDispatchActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args));
}

const INIT = () => `@@redux/INIT${getRandomString(6)}`;
const UNKNOWN = () => `@@redux/PROBE_UNKNOWN_ACTION${getRandomString(6)}`;

function validateReducers(reducers) {
  if (!isPlainObject(reducers)) {
    throw new Error("reducers must be a plain object");
  }

  Object.keys(reducers).forEach((key) => {
    const reducer = reducer[key];

    // 验证reducer必须返回一个state
    if (
      !reducer(undefined, { type: INIT() }) ||
      !reducer(undefined, { type: UNKNOWN() })
    ) {
      throw new Error(
        `reducer ${key} must not return undefined during initialization`
      );
    }
  });
}

export {
  isPlainObject,
  getRandomString,
  isFunction,
  getAutoDispatchActionCreator,
  INIT,
  UNKNOWN,
  validateReducers,
};
