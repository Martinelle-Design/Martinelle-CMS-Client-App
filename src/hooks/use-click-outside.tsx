import { useState, useEffect, useRef } from "react";

export default function useComponentVisible(initialValue: boolean) {
  const [isClickOutside, setisClickOutside] = useState(initialValue);
  const ref = useRef<HTMLButtonElement | HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setisClickOutside(false);
    } else setisClickOutside(true);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isClickOutside, setisClickOutside };
}
