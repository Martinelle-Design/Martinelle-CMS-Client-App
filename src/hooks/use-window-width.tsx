import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
const useWindowWidth = (width = 575) => {
  const [windowWidth, setWidth] = useState(window.innerWidth >= width);
  useEffect(() => {
    let isMount = true;
    const resize = () => {
      if (isMount) {
        if (windowWidth && window.innerWidth < width)
          setWidth((prevWidth) => !prevWidth);
        else if (!windowWidth && window.innerWidth >= width)
          setWidth((prevWidth) => !prevWidth);
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
  }, [width, windowWidth]);
  return windowWidth;
};
export default useWindowWidth;
