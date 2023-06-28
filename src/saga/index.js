export default function () {
  return function sagaMiddleware({ dispatch, getState }) {
    return function (next) {
      return function (action) {
        return next(action);
      };
    };
  };
}
