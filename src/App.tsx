import { useAppContext } from "./context";
import ChangeFilterScreen from "./screens/change-filter";
import InitialScreen from "./screens/initial";

const App = () => {
    const { state } = useAppContext();

    if (!state?.image) {
        return <InitialScreen />;
    }

    return <ChangeFilterScreen />;
};

export default App;
