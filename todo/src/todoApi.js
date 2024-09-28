import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTodo = createAsyncThunk("todo", async () => {
	const res = await fetch("http://localhost:8080");
    return await res.json();
});

export const postTodo = createAsyncThunk("add", async name => {
    const res = await fetch("http://localhost:8080", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return await res.json();
});

export const toggleTodo = createAsyncThunk("toggle", async id => {
	const res = await fetch(`http://localhost:8080/${id}`, {
		method: "PUT",
	});

	return await res.json();
});

export const deleteTodo = createAsyncThunk("del", async id => {
    const res = await fetch(`http://localhost:8080/${id}`, {
        method: "DELETE"
    });

    return await res.json();
});
