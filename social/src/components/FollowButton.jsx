import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";

import { useApp } from "../ThemedApp";

export default function FollowButton({ user }) {
	const { auth, authUser } = useApp();

    const queryClient = useQueryClient();

	function isFollowing() {
		if (!auth) return false;
		return user.following.find(item => item.followerId == authUser.id);
	}

	const follow = useMutation(async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:8080/follow/${user.id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.json();
    }, {
		onSuccess: async () => {
			await queryClient.invalidateQueries("users");
			await queryClient.invalidateQueries("user");
			await queryClient.invalidateQueries("search");
		},
	});

	const unfollow = useMutation(
		async () => {
			const token = localStorage.getItem("token");

			const res = await fetch(`http://localhost:8080/unfollow/${user.id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return res.json();
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries("users");
				await queryClient.invalidateQueries("user");
				await queryClient.invalidateQueries("search");
			},
		}
	);

	return auth.id === user.id ? (
		<></>
	) : (
		<Button
			size="small"
			variant={isFollowing() ? "outlined" : "contained"}
			sx={{ borderRadius: 5 }}
			onClick={e => {
				if (isFollowing()) {
					unfollow.mutate(user.id);
				} else {
					follow.mutate(user.id);
				}

				e.stopPropagation();
			}}>
			{isFollowing() ? "Following" : "Follow"}
		</Button>
	);
}
