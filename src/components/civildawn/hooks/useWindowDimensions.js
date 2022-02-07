import { useState, useEffect } from "react";

export default function useWindowDimensions() {
  const initialDimensions = {
    width: undefined,
    height: undefined
  };
  const [refDimensions, setWindowDimensions] = useState(initialDimensions);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return refDimensions;
}