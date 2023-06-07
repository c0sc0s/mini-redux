const compose =
  (...fn) =>
  (param) =>
    fn.reduceRight((acc, fn) => fn(acc), param);

export default compose;
