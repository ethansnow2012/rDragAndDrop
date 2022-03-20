
import {createContext, useContext, useReducer} from 'react'

const initialGlobalState = {
    num: 0,
    text: "foo",
    bool: false,
    scrollDirection: 'up'
  };

export const GlobalStateContext = createContext(initialGlobalState);
export const DispatchStateContext = createContext(null);
//console.log('DispatchStateContext', DispatchStateContext)

export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
      (state, newValue) => {
          //console.log('dispatching', state, newValue)
        return  { ...state, ...newValue }
      },
      initialGlobalState
    );
    console.log('GlobalStateProvider', state, dispatch)
    return (
      <GlobalStateContext.Provider value={state}>
        <DispatchStateContext.Provider value={dispatch}>
          {children}
        </DispatchStateContext.Provider>
      </GlobalStateContext.Provider>
    );
  };
  
// export const useGlobalState = () => [
//     useContext(GlobalStateContext),
//     useContext(DispatchStateContext)
// ];
export const useGlobalState = () => {
    console.log('useGlobalState', useContext(GlobalStateContext), useContext(DispatchStateContext))
    return [
        useContext(GlobalStateContext),
        useContext(DispatchStateContext),
    ]
};