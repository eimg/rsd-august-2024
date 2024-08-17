import { createContext, useContext, useState } from "react";
import App from "./App";

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export default function ThemedApp() {
    const [mode, setMode] = useState("dark");

    return <AppContext.Provider value={{ mode, setMode }}>
        <App />
    </AppContext.Provider>
}
