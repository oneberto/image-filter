import { useReducer } from "react";
import { AppContext, INITIAL_STATE } from ".";
import { reducer } from "./reducer";

type Props = {
    children: React.ReactNode;
};

const AppContextProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
