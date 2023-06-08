import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
const useWindowResize = () => {
  const [windowWidth, setWidth] = useState(window.innerWidth);
  const [windowHeight, setHeight] = useState(window.innerHeight)
  useEffect(() => {
    let isMount = true;
    const resize = () => {
      if (isMount) {
        if (windowWidth !== window.innerWidth)
          setWidth(window.innerWidth);
        if(windowHeight !== window.innerHeight)
          setHeight(window.innerHeight)
      }
    };
    const debouncedHandleResize = debounce(resize, 50);
    const cleanup = () => {
      window.removeEventListener("resize", debouncedHandleResize);
      isMount = false;
    };
    window.addEventListener("resize", debouncedHandleResize);

    // Remove event listener on cleanup
    return () => cleanup();
  }, [windowWidth, windowHeight]);
  return {windowWidth, windowHeight};
};
export default useWindowResize;
