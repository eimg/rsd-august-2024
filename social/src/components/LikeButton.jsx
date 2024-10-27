import { ButtonGroup, IconButton, Button } from "@mui/material";

import {
	FavoriteBorder as LikeIcon,
	Favorite as LikedIcon,
} from "@mui/icons-material";

import { useApp } from "../ThemedApp";

import { useMutation, useQueryClient } from "react-query";

async function postLike(postId) {
	const token = localStorage.getItem("token");

	const res = await fetch(`http://localhost:8080/like/${postId}`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.json();
}

async function deleteUnlike(postId) {
	const token = localStorage.getItem("token");

	const res = await fetch(`http://localhost:8080/unlike/${postId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.json();
}

export default function LikeButton({ item }) {
	const { auth, authUser } = useApp();
	const queryClient = useQueryClient();

	function isLiked() {
		if (auth && item.likes) {
			return item.likes.find(like => like.userId == authUser.id);
		}

		return false;
	}

	const like = useMutation(postLike, {
		onSuccess: async () => {
			await queryClient.cancelQueries("posts");
			await queryClient.invalidateQueries("posts");
			await queryClient.invalidateQueries("post");
		},
	});

	const unlike = useMutation(deleteUnlike, {
		onSuccess: async () => {
			await queryClient.cancelQueries("posts");
			await queryClient.invalidateQueries("posts");
			await queryClient.invalidateQueries("post");
		},
	});

	return (
		<ButtonGroup>
			{isLiked() ? (
				<IconButton
					size="small"
					onClick={e => {
						unlike.mutate(item.id);
						e.stopPropagation();
					}}>
					<LikedIcon
						color="error"
						fontSize="inherit"
					/>
				</IconButton>
			) : (
				<IconButton
					size="small"
					onClick={e => {
						like.mutate(item.id);
						e.stopPropagation();
					}}>
					<LikeIcon
						color="error"
						fontSize="inherit"
					/>
				</IconButton>
			)}
			<Button
				variant="text"
				size="small">
				{item.likes ? item.likes.length : 0}
			</Button>
		</ButtonGroup>
	);
}
