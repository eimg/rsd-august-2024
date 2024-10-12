import { Box, Divider, IconButton, OutlinedInput } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";

import { useParams } from "react-router-dom";
import Item from "../components/Item";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

import Comment from "../components/Comment";

async function fetchPost(id) {
	const res = await fetch(`http://localhost:8080/posts/${id}`);

	return res.json();
}

async function deletePost(id) {
	return fetch(`http://localhost:8080/posts/${id}`, {
		method: "DELETE",
	});
}

async function postComment(data) {
	const token = localStorage.getItem("token");

	const res = await fetch("http://localhost:8080/comments", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	return res.json();
}

export default function Post() {
	const { id } = useParams();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { data, isLoading } = useQuery(["post", id], () => fetchPost(id));
	const queryClient = useQueryClient();

	const remove = useMutation(deletePost, {
		onMutate: async id => {
			await queryClient.cancelQueries("posts");
			queryClient.setQueryData("posts", old => {
				return old.filter(item => item.id !== id);
			});
		},
	});

	const addComment = useMutation(postComment, {
		onSuccess: async () => {
			await queryClient.invalidateQueries(["post", id]);
		},
	});

	if (isLoading) {
		return <Box>Loading...</Box>;
	}

	return (
		<Box>
			<Item
				primary
				key={data.id}
				item={data}
				remove={remove}
			/>

			<Divider />

			<Box sx={{ my: 2 }}>
				{data.comments.map(comment => {
					return (
						<Comment
							key={comment.id}
							comment={comment}
						/>
					);
				})}
			</Box>

			<Divider />

			<form onSubmit={handleSubmit(data => addComment.mutate(data))}>
				<input
					type="hidden"
					{...register("postId")}
					value={id}
				/>
				<OutlinedInput
					{...register("content", { required: true })}
					multiline
					fullWidth
					placeholder="Add comment"
					error={Boolean(errors.content)}
					endAdornment={
						<IconButton type="submit">
							<SendIcon />
						</IconButton>
					}
				/>
			</form>
		</Box>
	);
}
