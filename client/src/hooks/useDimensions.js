import { useState, useEffect } from "react";

const getWindowDim = () => {
  const { innerWidth: width, innerHeight: height } = window;

  return { width, height };
};

const useDimensions = () => {
  const [dimensions, setDimensions] = useState(getWindowDim());

  useEffect(() => {
    function handleResize() {
      setDimensions(getWindowDim());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return dimensions;
};

export default useDimensions;
