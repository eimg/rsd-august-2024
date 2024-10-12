import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";

import {
	Alarm as TimeIcon,
	AccountCircle as UserIcon,
	Delete as DeleteIcon,
} from "@mui/icons-material";

import { grey } from "@mui/material/colors";

import { useMutation, useQueryClient } from "react-query";

async function deleteComment(id) {
	const token = localStorage.getItem("token");

	const res = await fetch(`http://localhost:8080/comments/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.json();
}

export default function Comment({ comment }) {
	const queryClient = useQueryClient();

	const remove = useMutation(deleteComment, {
		onSuccess: async () => {
			await queryClient.invalidateQueries("post");
		},
	});

	return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
					}}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							aligncomments: "center",
							gap: 1,
						}}>
						<TimeIcon
							fontSize="10"
							sx={{ color: grey[500] }}
						/>
						<Typography
							variant="caption"
							sx={{ color: grey[500] }}>
							{comment.created}
						</Typography>
					</Box>
					<IconButton
						sx={{ color: "text.fade" }}
						size="small"
						onClick={e => {
							remove.mutate(comment.id);
							e.stopPropagation();
						}}>
						<DeleteIcon
							color="inherit"
							fontSize="inherit"
						/>
					</IconButton>
				</Box>

				<Typography sx={{ my: 3 }}>{comment.content}</Typography>

				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
					}}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							aligncomments: "center",
							gap: 1,
						}}>
						<UserIcon
							fontSize="12"
							sx={{ color: grey[500] }}
						/>
						<Typography
							variant="caption"
							sx={{ color: grey[500] }}>
							{comment.user.name}
						</Typography>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}
