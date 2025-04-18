// import React, { useState } from "react";
import { useState } from "react";
import GlobalContext from "./GlobalContext";
 
const GlobalState = (props) => {
  
 
  return (
    <GlobalContext.Provider
      value={{
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
 
export default GlobalState;