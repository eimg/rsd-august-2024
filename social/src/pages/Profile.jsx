import { Avatar, Box, Typography } from "@mui/material";
import { grey, teal } from "@mui/material/colors";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import Item from "../components/Item";
import FollowButton from "../components/FollowButton";

export default function Profile() {
	const { id } = useParams();

	const { data, error, isLoading } = useQuery(["user", id], async () => {
		const res = await fetch(`http://localhost:8080/users/${id}`);
		return res.json();
	});

	if (isLoading) {
		return <Box>Loading...</Box>;
	}

	if (error) {
		return <Box>{error}</Box>;
	}

	return (
		<Box>
			<Box
				sx={{ height: 140, bgcolor: grey[500], borderRadius: 4 }}></Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 2,
					alignItems: "center",
					marginTop: "-64px",
				}}>
				<Avatar sx={{ width: 128, height: 128, bgcolor: teal[500] }} />

				<Typography>{data.name}</Typography>
                <FollowButton user={data} />
			</Box>
			<Box sx={{ mt: 4 }}>
				{data.posts.map(post => {
					return (
						<Item
							key={post.id}
							item={post}
							remove={() => {}}
						/>
					);
				})}
			</Box>
		</Box>
	);
}
