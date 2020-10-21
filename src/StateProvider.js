// setup datalayer-->
//We need  this to track the basket
import React, { createContext, useReducer,useContext} from "react";


//this is the datalayer
export const StateContext =createContext();

//BIULD A PROVIDER
export const StateProvider =({reducer,initialState,children}) =>(
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
       </StateContext.Provider>
)
   //this is how we use it inside of a component
   export const useStateValue = () => useContext(StateContext);  
   