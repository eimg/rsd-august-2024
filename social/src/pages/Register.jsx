import { useState } from "react";
import { Box, Typography, OutlinedInput, Button, Alert } from "@mui/material";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

async function postRegister(data) {
	const res = await fetch("http://localhost:8080/register", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		throw new Error(await res.json());
	}

	return res.json();
}

export default function Register() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();
	const [error, setError] = useState("");

	const createUser = useMutation(postRegister, {
		onSuccess: () => navigate("/login"),
		onError: () => setError("Something went wrong"),
	});

	return (
		<Box>
			<Typography
				variant="h3"
				sx={{ mb: 4 }}>
				Register
			</Typography>

			{error && (
				<Alert
					severity="warning"
					sx={{ mb: 4 }}>
					{error}
				</Alert>
			)}

			<form onSubmit={handleSubmit(data => createUser.mutate(data))}>
				<OutlinedInput
					sx={{ mb: 2 }}
					fullWidth
					placeholder="Name"
					error={Boolean(errors.name)}
					{...register("name", { required: true })}
				/>

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
					multiline
					sx={{ mb: 2 }}
					fullWidth
					placeholder="Profile"
					{...register("profile")}
				/>
				<OutlinedInput
					sx={{ mb: 2 }}
					type="password"
					placeholder="Password"
					fullWidth
					error={Boolean(errors.password)}
					{...register("password", { required: true })}
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
