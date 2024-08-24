import { Box, Typography, OutlinedInput, Button, Alert } from "@mui/material";

export default function Register() {
	return (
		<Box>
			<Typography
				variant="h3"
				sx={{ mb: 4 }}>
				Register
			</Typography>

			<Alert
				severity="warning"
				sx={{ mb: 4 }}>
				Username and Password required
			</Alert>

			<form>
				<OutlinedInput
					sx={{ mb: 2 }}
					fullWidth
					placeholder="Name"
				/>
				<OutlinedInput
					sx={{ mb: 2 }}
					fullWidth
					placeholder="Username"
				/>
				<OutlinedInput
                    multiline
					sx={{ mb: 2 }}
					fullWidth
					placeholder="Profile"
				/>
				<OutlinedInput
					sx={{ mb: 2 }}
					fullWidth
					placeholder="Password"
					type="password"
				/>

				<Button
					variant="contained"
					type="submit"
					fullWidth>
					Register
				</Button>
			</form>
		</Box>
	);
}
