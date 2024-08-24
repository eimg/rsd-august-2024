import { Box, Typography, OutlinedInput, Button, Alert, } from "@mui/material";

export default function Login() {
    return <Box>
        <Typography variant="h3" sx={{ mb: 4 }}>Login</Typography>

        <Alert severity="warning" sx={{ mb: 4 }}>Username and Password required</Alert>

        <form>
            <OutlinedInput sx={{ mb: 2 }} fullWidth placeholder="Username" />
            <OutlinedInput sx={{ mb: 2 }} fullWidth placeholder="Password" type="password" />

            <Button variant="contained" type="submit" fullWidth>Login</Button>
        </form>
    </Box>
}
