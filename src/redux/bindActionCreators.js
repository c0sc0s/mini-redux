function bindActionCreator(actionCreator, dispatch) {
  if (isFunction(actionCreator)) {
    return getAutoDispatchActionCreator(actionCreator, dispatch);
  } else if (isPlainObject(actionCreator)) {
    const result = {};

    // 为什么要用Object.keys()而不是for...in...?
    // 因为for...in...会遍历原型链上的属性，而Object.keys()只会遍历对象自身的属性
    Object.keys(actionCreator).forEach((key) => {
      if (isFunction(actionCreator[key])) {
        result[key] = getAutoDispatchActionCreator(
          actionCreator[key],
          dispatch
        );
      } else
        throw new Error("actionCreator must be a function or a plain object");
    });

    return result;
  } else throw new Error("actionCreator must be a function or a plain object");
}

export default bindActionCreator;
