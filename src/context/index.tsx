import { createContext, useContext } from "react";
import { Context, ContextState } from "./types";

export const INITIAL_STATE: ContextState = {};

export const AppContext = createContext<Context>({
    state: INITIAL_STATE,
    dispatch: () => {},
});

export const useAppContext = () => {
    return useContext(AppContext);
};
