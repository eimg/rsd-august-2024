import { createContext, useContext, useMemo, useState } from "react";
import App from "./App";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export default function ThemedApp() {
    const [mode, setMode] = useState("dark");

    const theme = useMemo(() => {
        return createTheme({
			palette: {
				mode,
			},
		});
    }, [mode]);

    return (
		<AppContext.Provider value={{ mode, setMode }}>
			<ThemeProvider theme={theme}>
				<App />
                <CssBaseline />
			</ThemeProvider>
		</AppContext.Provider>
	);
}
