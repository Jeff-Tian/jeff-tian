import R from "ramda";

type Executor = (
  resolve: (value?: any) => void,
  reject: (value?: any) => void
) => void;

const curriedSetTimeout = (time: number) => (func: () => void) => {
  setTimeout(func, time);
};

const promisify = (func: Executor) => new Promise(func);

export const sleep = R.compose(promisify, curriedSetTimeout, R.multiply(1000));
