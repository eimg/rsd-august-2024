import { useState, createContext, useContext, useMemo } from "react";

import {
    Container,
	CssBaseline,
	ThemeProvider,
	createTheme,
} from "@mui/material";

import { Outlet } from "react-router-dom";

import AppDrawer from "./components/AppDrawer";
import Header from "./components/Header";

import { grey, teal } from "@mui/material/colors";

const AppContext = createContext();

export function useApp() {
	return useContext(AppContext);
}

export default function ThemedApp() {
	const [showDrawer, setShowDrawer] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [mode, setMode] = useState("dark");

	const theme = useMemo(() => {
		return createTheme({
			palette: {
				mode,
				primary: teal,
				banner: mode === "dark" ? grey[800] : grey[200],
				text: {
					fade: grey[500],
				},
			},
		});
	}, [mode]);

	return (
		<ThemeProvider theme={theme}>
			<AppContext.Provider
				value={{
					showDrawer,
					setShowDrawer,
					showForm,
					setShowForm,
					mode,
					setMode,
				}}>
				<Header />

				<Container maxWidth="sm" sx={{ mt: 4 }}>
					<Outlet />
				</Container>

				<AppDrawer />
				<CssBaseline />
			</AppContext.Provider>
		</ThemeProvider>
	);
}
