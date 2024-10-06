import {
	Box,
	Card,
	CardContent,
	Typography,
	IconButton,
} from "@mui/material";

import {
	Alarm as TimeIcon,
	AccountCircle as UserIcon,
	Delete as DeleteIcon,
} from "@mui/icons-material";

import { green, teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

import LikeButton from "./LikeButton";

export default function Item({ item, remove, primary }) {
    const navigate = useNavigate();

	return (
		<Card sx={{ mb: 2, border: primary ? 1 : 0, borderColor: teal[500] }}>
			<CardContent onClick={() => navigate(`/post/${item.id}`)}>
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
							alignItems: "center",
							gap: 1,
						}}>
						<TimeIcon
							fontSize="10"
							color="success"
						/>
						<Typography
							variant="caption"
							sx={{ color: green[500] }}>
							{item.created}
						</Typography>
					</Box>
					<IconButton
						sx={{ color: "text.fade" }}
						size="small"
						onClick={e => {
							remove.mutate(item.id);
							e.stopPropagation();
						}}>
						<DeleteIcon
							color="inherit"
							fontSize="inherit"
						/>
					</IconButton>
				</Box>

				<Typography sx={{ my: 3 }}>{item.content}</Typography>

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
							alignItems: "center",
							gap: 1,
						}}>
						<UserIcon
							fontSize="12"
							color="info"
						/>
						<Typography variant="caption">
							{item.user.name}
						</Typography>
					</Box>

					<LikeButton item={item} />
				</Box>
			</CardContent>
		</Card>
	);
}
