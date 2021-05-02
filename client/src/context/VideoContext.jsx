import React, { createContext, useState } from "react";

export const VideoContext = createContext({});

export const VideoContextProvider = ({ children }) => {
  const [refs, setRefs] = useState({});
  const [stream, setStream] = useState(null);

  return (
    <VideoContext.Provider value={{ refs, setRefs, setStream, stream }}>
      {children}
    </VideoContext.Provider>
  );
};
