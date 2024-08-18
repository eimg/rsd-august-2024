import { useState, useRef } from "react";
import Item from "./Item";
import Header from "./Header";

import {
	List,
	Box,
	Container,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";

import { useAppContext } from "./ThemedApp";

export default function App() {
	const { mode } = useAppContext();

	const inputRef = useRef();

	const [showForm, setShowForm] = useState(true);

	const [data, setData] = useState([
		{ id: 3, content: "Apple" },
		{ id: 2, content: "Orange" },
		{ id: 1, content: "Mango" },
	]);

	const add = content => {
		const id = data[0] ? data[0].id + 1 : 1;
		setData([{ id, content }, ...data]);
	};

	const remove = id => {
		setData(data.filter(item => item.id !== id));
	};

	return (
		<Box>
			<Header
				showForm={showForm}
				setShowForm={setShowForm}
			/>
			<Container
				maxWidth="sm"
				sx={{ mt: 2 }}>
				{showForm && (
					<form
						onSubmit={e => {
							e.preventDefault();
							add(inputRef.current.value);
							e.currentTarget.reset();
						}}>
						<OutlinedInput
							fullWidth
							inputRef={inputRef}
							endAdornment={
								<InputAdornment position="end">
									<IconButton type="submit">
										<AddIcon />
									</IconButton>
								</InputAdornment>
							}
						/>
					</form>
				)}
				<List>
					{data.map(item => {
						return (
							<Item
								key={item.id}
								item={item}
								remove={remove}
							/>
						);
					})}
				</List>
			</Container>
		</Box>
	);
}
