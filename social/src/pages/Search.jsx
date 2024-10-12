import {
	Box,
	OutlinedInput,
	IconButton,
	List,
	ListItem,
	ListItemText,
    ListItemAvatar,
    Avatar,
    ListItemButton,
    ListItemSecondaryAction,
} from "@mui/material";

import { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import FollowButton from "../components/FollowButton";

export default function Search() {
	const { handleSubmit, register } = useForm();

    const navigate = useNavigate();

	const [search, setSearch] = useState([]);

    const { data, isLoading, error } = useQuery(["search", search], async () => {
        const res = await fetch(`http://localhost:8080/search?q=${search}`);
        return res.json();
    }) 

	const searchUser = ({ q }) => {
		setSearch(q);
	};

    if (isLoading) {
		return <Box>Loading...</Box>;
	}

	if (error) {
		return <Box>{error}</Box>;
	}

	return (
		<Box>
			<form onSubmit={handleSubmit(searchUser)}>
				<OutlinedInput
					{...register("q")}
					fullWidth
					placeholder="Search"
					endAdornment={
						<IconButton type="submit">
							<SearchIcon />
						</IconButton>
					}
				/>
			</form>

			<List sx={{ mt: 2 }}>
				{data.map(user => {
					return (
						<ListItem key={user.id}>
							<ListItemButton onClick={() => navigate(`/profile/${user.id}`)}>
								<ListItemAvatar>
									<Avatar />
								</ListItemAvatar>
								<ListItemText 
                                    primary={user.name}
                                    secondary={user.username}
                                />
                                <ListItemSecondaryAction>
                                    <FollowButton user={user} />
                                </ListItemSecondaryAction>
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
}
