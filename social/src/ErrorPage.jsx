import { Box, CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";

export default function ErrorPage() {
	return (
		<>
			<Box
				sx={{
					height: 400,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				Something Went Wrong! <Link to="/">Go Home</Link>
			</Box>
			<CssBaseline />
		</>
	);
}
