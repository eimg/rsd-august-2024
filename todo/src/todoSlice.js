import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
	name: "todo",
	initialState: {
		items: [
            { id: 3, name: "Milk", done: false },
            { id: 2, name: "Egg", done: true },
            { id: 1, name: "Bread", done: false },
        ],
	},
	reducers: {
		add: (state, action) => {
            const id = state.items[0].id + 1;
			state.items.push({ id, name: action.payload, done: false });
		},
        del: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        toggle: (state, action) => {
            state.items = state.items.map(item => {
                if(item.id == action.payload) {
                    item.done = !item.done;
                }

                return item;
            });
        }
	}
});

export const { add, del, toggle } = todoSlice.actions;
export default todoSlice.reducer;
