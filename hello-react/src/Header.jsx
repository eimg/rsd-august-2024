import { useAppContext } from "./ThemedApp";

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
} from "@mui/material";

import {
    Add as AddIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
} from "@mui/icons-material";

export default function Header({ showForm, setShowForm }) {
    const { mode, setMode } = useAppContext();

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography sx={{ flexGrow: 1 }}>App</Typography>
				<Box>
					<IconButton
						color="inherit"
						onClick={() => setShowForm(!showForm)}>
						<AddIcon />
					</IconButton>
					<IconButton
						color="inherit"
						edge="end"
						onClick={() => {
							mode == "dark" ? setMode("light") : setMode("dark");
						}}>
						{mode == "dark" ? <LightModeIcon /> : <DarkModeIcon />}
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
