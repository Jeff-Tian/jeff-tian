import R from "ramda";

type Executor = (
  resolve: (value?: any) => void,
  reject: (value?: any) => void
) => void;

const curriedSetTimeout = (time: number) => (func: () => void) => {
  setTimeout(func, time);
};

const promisify = (func: Executor) => new Promise(func);

export const sleepAtLeast = R.compose(
  promisify,
  curriedSetTimeout,
  R.multiply(1000)
);

/**
 * @deprecated Since version 1.1.0. Will be deleted in version 2.0.0. Use sleepAtLeast instead.
 */
export const sleep = R.compose(
  sleepAtLeast,
  R.tap(() =>
    console.warn(
      "@deprecated Since version 1.1.0. Will be deleted in version 2.0.0. Use sleepAtLeast instead."
    )
  )
);
