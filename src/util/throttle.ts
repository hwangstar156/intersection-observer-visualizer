export function throttle<T extends Function>(func: T, delay: number) {
  let flag = true;

  return function () {
    if (flag) {
      func();
      flag = false;
      setTimeout(() => (flag = true), delay);
    }
  };
}
