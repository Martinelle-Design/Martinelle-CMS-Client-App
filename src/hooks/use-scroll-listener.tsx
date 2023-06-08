import { useState, useEffect } from "react";
import { RefObject } from "react";
import { debounce } from "lodash";
const checkScrollEnd = (el: HTMLElement) => {
    return Math.ceil(el.scrollTop + el.offsetHeight) >= el.scrollHeight - 1
}
const useScrollListener = (el: RefObject<HTMLElement | null>) => {
  const defaultNode = el.current;
  const [yScroll, setYScroll] = useState(
    defaultNode ? defaultNode.scrollTop : 0
  );
  const [yScrollEnd, setYScrollEnd] = useState(
    defaultNode
      ? checkScrollEnd(defaultNode)
      : false
  );
  const [xScroll, setXScroll] = useState(
    el.current ? el.current.scrollLeft : 0
  );
  useEffect(() => {
    const node = el.current;
    let isMount = true;
    const resize = () => {
      if (isMount) {
        if (node && yScroll !== node.scrollTop) {
            setYScroll(node.scrollTop);
            if(checkScrollEnd(node)) setYScrollEnd(true)
            else setYScrollEnd(false)
        }
        if (node && xScroll !== node.scrollLeft) {
            setXScroll(node.scrollLeft);
        }
      }
    };
    const debouncedHandleResize = debounce(resize, 50);
    const cleanup = () => {
      if (node) node.removeEventListener("scroll", debouncedHandleResize);
      isMount = false;
    };
    if (node) node.addEventListener("scroll", debouncedHandleResize);

    // Remove event listener on cleanup
    return () => cleanup();
  }, [el, yScroll, xScroll]);
  return { yScroll, xScroll, yScrollEnd };
};
export default useScrollListener;
