/* eslint-disable import/prefer-default-export */
import { createContext, useContext, useReducer } from 'react';
import itineraryReducer from './itineraryReducer';
import defaultData from './defaultData';

const ItineraryContext = createContext(null);
const DispatchContext = createContext(null);

export function ItineraryProvider({ children }) {
  const [lists, dispatch] = useReducer(itineraryReducer, defaultData);
  return (
    <ItineraryContext.Provider value={lists}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </ItineraryContext.Provider>
  );
}

export function useLists() { return useContext(ItineraryContext); }
export function useDispatch() { return useContext(DispatchContext); }
