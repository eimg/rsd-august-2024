import { useRef } from "react";

import {
	Container,
	OutlinedInput,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Typography,
	Badge,
} from "@mui/material";

import {
	Delete as DeleteIcon,
	SquareOutlined as CheckIcon,
    Check as DoneIcon,
    Add as AddIcon,
} from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import { add, del, toggle } from "./todoSlice";
import { postTodo, deleteTodo, toggleTodo } from "./todoApi";

export default function App() {
	const nameRef = useRef();

	const items = useSelector(state =>
		state.todo.items.filter(item => !item.done)
	);
	const done = useSelector(state =>
		state.todo.items.filter(item => item.done)
	);

	const disatch = useDispatch();

	return (
		<Container maxWidth="md">
			<Typography
				variant="h4"
				sx={{ my: 4 }}>
				<Badge
					badgeContent={items.length}
					color="error">
					Redux Todo
				</Badge>
			</Typography>

			<form
				onSubmit={e => {
					e.preventDefault();
					disatch(postTodo(nameRef.current.value));
					e.currentTarget.reset();
				}}>
				<OutlinedInput
					inputRef={nameRef}
					fullWidth
					endAdornment={
						<IconButton>
							<AddIcon />
						</IconButton>
					}
				/>
			</form>

			<List sx={{ mt: 4 }}>
				{items.map(item => {
					return (
						<ListItem key={item.id}>
							<IconButton
								edge="start"
								onClick={() => {
									disatch(toggleTodo(item.id));
								}}>
								<CheckIcon />
							</IconButton>
							<ListItemText primary={item.name} />
							<IconButton
								onClick={() => {
									disatch(deleteTodo(item.id));
								}}>
								<DeleteIcon />
							</IconButton>
						</ListItem>
					);
				})}
			</List>

			<List>
				{done.map(item => {
					return (
						<ListItem key={item.id}>
							<IconButton
								edge="start"
								onClick={() => {
									disatch(toggleTodo(item.id));
								}}>
								<DoneIcon color="success" />
							</IconButton>
							<ListItemText primary={item.name} />
							<IconButton
								onClick={() => {
									disatch(deleteTodo(item.id));
								}}>
								<DeleteIcon />
							</IconButton>
						</ListItem>
					);
				})}
			</List>
		</Container>
	);
}
