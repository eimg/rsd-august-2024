import { useState, createContext, useContext, useMemo, useEffect } from "react";

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

    const [auth, setAuth] = useState(false);
    const [authUser, setAuthUser] = useState({});

    useEffect(() => {
        // httpOnly cookie
        const token = localStorage.getItem("token");

        fetch("http://localhost:8080/verify", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then(async res => {
            if(res.ok) {
                const user = await res.json();
				setAuth(true);
				setAuthUser(user);
            }
        });
    }, []);

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
                    auth,
                    setAuth,
                    authUser,
                    setAuthUser,
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
