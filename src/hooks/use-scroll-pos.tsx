import { useState, useEffect } from "react";
import { isNumber, debounce } from "lodash";
const useScrollPos = ({
  xScrollPos,
  yScrollPos,
  callBack
}: {
  xScrollPos?: number;
  yScrollPos?: number;
  callBack?: (e?: boolean) => void
}) => {
  const defaultValue =
    (isNumber(xScrollPos) && window.scrollX >= xScrollPos) ||
    (isNumber(yScrollPos) && window.scrollY >= yScrollPos);
  const [scrollPos, setScrollPos] = useState(defaultValue);
  useEffect(() => {
    let isMount = true;
    const resize = (e: Event) => {
      if (isMount) {
        if (scrollPos && isNumber(xScrollPos) && window.scrollX < xScrollPos)
          setScrollPos((prevWidth) => !prevWidth);
        else if (
          !scrollPos &&
          isNumber(xScrollPos) &&
          window.scrollX >= xScrollPos
        )
          setScrollPos((prevWidth) => !prevWidth);
        else if (
          scrollPos &&
          isNumber(yScrollPos) &&
          window.scrollY < yScrollPos
        )
          setScrollPos((prevWidth) => !prevWidth);
        else if (
          !scrollPos &&
          isNumber(yScrollPos) &&
          window.scrollY >= yScrollPos
        )
          setScrollPos((prevWidth) => !prevWidth);
      }
    };
    const debouncedHandleResize = debounce(resize, 50);
    const cleanup = () => {
      window.removeEventListener("scroll", debouncedHandleResize);
      isMount = false;
    };
    window.addEventListener("scroll", debouncedHandleResize);
    // if(callBack) callBack()
    // Remove event listener on cleanup
    return () => cleanup();
  }, [xScrollPos, yScrollPos, scrollPos]);
  useEffect(() => {
    if(callBack) callBack(scrollPos)
  }, [callBack, scrollPos])
  return scrollPos;
};
export default useScrollPos;
