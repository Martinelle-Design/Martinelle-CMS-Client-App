import { useEffect, useState, useRef } from "react";

const useCursorInside = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inside, setInside] = useState(false);
  const [mounted, setMounted] = useState(false);
  //RE-RENDER AT LEAST ONCE TO SET REF
  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);
  useEffect(() => {
    const hoverInFunc = () => setInside(true);
    const hoverOutFunc = () => setInside(false);
    const touchDown = () => setInside((state) => !state);
    if (!ref.current) return;
    ref.current.addEventListener("mouseenter", hoverInFunc);
    ref.current.addEventListener("mouseleave", hoverOutFunc);
    ref.current.addEventListener("touchdown", touchDown);
    const cleanup = () => {
      if (!ref.current) return;
      ref.current.removeEventListener("mouseenter", hoverInFunc);
      ref.current.removeEventListener("mouseleave", hoverOutFunc);
      ref.current.removeEventListener("touchdown", touchDown);
    };
    return () => cleanup();
  });
  return { ref, inside };
};
export default useCursorInside;
