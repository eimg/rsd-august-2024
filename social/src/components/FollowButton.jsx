import { Button } from "@mui/material";
import { useMutation } from "react-query";

import { useApp, queryClient } from "../ThemedApp";

export default function FollowButton({ user }) {
	const { auth } = useApp();

	function isFollowing() {
		if (!auth) return false;
		return user.following.find(item => item.followerId == auth.id);
	}

	const follow = useMutation(()=>{}, {
		onSuccess: async () => {
			await queryClient.refetchQueries("users");
			await queryClient.refetchQueries("user");
		},
	});

	const unfollow = useMutation(()=>{}, {
		onSuccess: async () => {
			await queryClient.refetchQueries("users");
			await queryClient.refetchQueries("user");
		},
	});

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
