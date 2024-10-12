import { Box } from "@mui/material";

import Form from "../components/Form";
import Item from "../components/Item";

import { useApp } from "../ThemedApp";

import { useQuery, useMutation, useQueryClient } from "react-query";

const api = "http://localhost:8080/posts";

async function fetchPosts() {
	const res = await fetch(api);
	return res.json();
}

async function deletePost(id) {
	return fetch(`${api}/${id}`, { method: "DELETE" });
}

async function postPost(content) {
	const res = await fetch(api, {
		method: "POST",
		body: JSON.stringify({ content }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return res.json();
}

export default function Home() {
	const { showForm } = useApp();
	const { data, error, isError, isLoading } = useQuery("posts", fetchPosts);

	const queryClient = useQueryClient();

	const remove = useMutation(id => deletePost(id), {
		onMutate: async id => {
			await queryClient.cancelQueries("posts");
			queryClient.setQueryData("posts", old => {
				return old.filter(item => item.id !== id);
			});
		},
	});

	const add = useMutation(content => postPost(content), {
		onSuccess: async () => {
			await queryClient.cancelQueries("posts");
			queryClient.invalidateQueries("posts");
		},
	});

	if (isError) {
		return <Box>{error}</Box>;
	}

	if (isLoading) {
		return <Box>Loading...</Box>;
	}

	return (
		<Box>
			{showForm && <Form add={add} />}

			{data.map(item => {
				return (
					<Item
						key={item.id}
						item={item}
						remove={remove}
					/>
				);
			})}
		</Box>
	);
}
