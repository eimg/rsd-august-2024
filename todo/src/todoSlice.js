import { createSlice } from "@reduxjs/toolkit";
import { getTodo, postTodo, deleteTodo, toggleTodo } from "./todoApi";

export const todoSlice = createSlice({
	name: "todo",
	initialState: {
		items: [],
	},
	reducers: {
		add: (state, action) => {
			const id = state.items[0].id + 1;
			state.items.push({ id, name: action.payload, done: false });
		},
		del: (state, action) => {
			state.items = state.items.filter(
				item => item.id !== action.payload
			);
		},
		toggle: (state, action) => {
			state.items = state.items.map(item => {
				if (item.id == action.payload) {
					item.done = !item.done;
				}

				return item;
			});
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getTodo.fulfilled, (state, action) => {
				state.items = action.payload;
			})
			.addCase(postTodo.fulfilled, (state, action) => {
				state.items = [action.payload, ...state.items];
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				state.items = state.items.filter(
					item => item.id !== action.payload.id
				);
			})
			.addCase(toggleTodo.fulfilled, (state, action) => {
				state.items = state.items.map(item => {
					if (item.id == action.payload.id) {
						item.done = !item.done;
					}

					return item;
				});
			});
	},
});

export const { add, del, toggle } = todoSlice.actions;
export default todoSlice.reducer;
