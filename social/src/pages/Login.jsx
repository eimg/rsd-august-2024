import { useState } from "react";
import { Box, Typography, OutlinedInput, Button, Alert } from "@mui/material";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useApp } from "../ThemedApp";

async function postLogin(data) {
	const res = await fetch("http://localhost:8080/login", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

    if(!res.ok) {
        throw new Error(await res.json());
    }

	return res.json();
}

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [error, setError] = useState("");

	const navigate = useNavigate();

	const { setAuth, setAuthUser } = useApp();

	const login = useMutation(postLogin, {
		onSuccess: ({ token, user }) => {
			localStorage.setItem("token", token);
			setAuth(true);
			setAuthUser(user);
			navigate("/");
		},
        onError: () => setError("Something went wrong"),
	});

	return (
		<Box>
			<Typography
				variant="h3"
				sx={{ mb: 4 }}>
				Login
			</Typography>

			{error && (
				<Alert
					severity="warning"
					sx={{ mb: 4 }}>
					{error}
				</Alert>
			)}

			<form onSubmit={handleSubmit(data => login.mutate(data))}>
				<OutlinedInput
					sx={{ mb: 2 }}
					fullWidth
					placeholder="Username"
					error={Boolean(errors.username)}
					{...register("username", {
						required: true,
						pattern: /^[a-z0-9_]+$/i,
					})}
				/>
				<OutlinedInput
					sx={{ mb: 2 }}
					fullWidth
					placeholder="Password"
					type="password"
					error={Boolean(errors.password)}
					{...register("password", { required: true })}
				/>

				<Button
					variant="contained"
					type="submit"
					fullWidth>
					Login
				</Button>
			</form>
		</Box>
	);
}
