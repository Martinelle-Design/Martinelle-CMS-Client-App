import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { debounce } from 'lodash';
export const useBoundingClient = () => {
  const ref = useRef<HTMLDivElement| HTMLParagraphElement>(null);
  const [bbox, setBbox] = useState<DOMRect| null>(null);

  const set = () =>{
    const bBox = ref && ref.current ? ref.current.getBoundingClientRect(): null
    setBbox(bBox);
    return bBox
  }
  useEffect(() => {
    let isMount = true;
    const debouncedHandleResize = debounce(set, 100);
    const cleanup = () => {
      window.removeEventListener("resize", debouncedHandleResize);
      isMount = false;
    };
    window.addEventListener("resize", debouncedHandleResize);
    return () => { if(isMount) cleanup() }
  }, []);

  return {box: bbox, ref, set};
};