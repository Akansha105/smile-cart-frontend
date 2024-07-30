import { useRef } from "react";

const useFuncDebounce = func => {
  const timer = useRef(null);
  const debounceFun = (...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => func(...args), 350);
  };

  return debounceFun;
};
export default useFuncDebounce;
