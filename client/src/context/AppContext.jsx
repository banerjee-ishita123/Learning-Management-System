import { createContext } from "react";
export const AppContext = createContext()/* AppContex act like a storage box where we can keep storage data*/ 
export const AppContextProvider=(props)=>{
  /* This AppContexProvider component will wrap around the parts of our app that need access to the shared data.*/ 
    const value={

    }
        return(
          /*<AppContext.Provider> is the actual provider that shares data. 
          {props.children} means whatever components are inside AppContextProvider will have access to this shared data. */
          <AppContext.Provider value={value}> 
           
            {props.children}
          </AppContext.Provider>
        )
}
