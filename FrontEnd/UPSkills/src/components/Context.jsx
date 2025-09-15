import { createContext, useContext } from "react";

const ContextProvider=createContext();

const ContextFunc=(child)=>{
    return <ContextProvider props={child}>

    </ContextProvider>
}

export const ContextP=useContext(ContextFunc)