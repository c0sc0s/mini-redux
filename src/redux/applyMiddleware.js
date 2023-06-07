import compose from "./compose";

export default function (...middlewares) {
  return function (createStore) {
    return function (reducer, defaultState) {
      const store = createStore(reducer, defaultState);
      let dispatch = () => {
        throw new Error("error ");
      };

      const ezStore = {
        getState: store.getState,
        dispatch: store.dispatch,
      };

      const dispatchProducers = middlewares.map((middleware) =>
        middleware(ezStore)
      );

      dispatch = compose(...dispatchProducers)(store.dispatch);

      return {
        ...store,
        dispatch,
      };
    };
  };
}
