import { useState, useRef } from "react";
import Item from "./Item";
import Header from "./Header";

import { useAppContext } from "./ThemedApp";

export default function App() {
	const { mode } = useAppContext();

	const inputRef = useRef();

	const [showForm, setShowForm] = useState(false);

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
		<div>
			<Header
				showForm={showForm}
				setShowForm={setShowForm}
			/>
			<form
				style={{
					marginBottom: 20,
					display: showForm ? "flex" : "none",
				}}
				onSubmit={e => {
					e.preventDefault();
					add(inputRef.current.value);
					e.currentTarget.reset();
				}}>
				<input
					style={{ flexGrow: 1 }}
					type="text"
					ref={inputRef}
				/>
				<button>Add</button>
			</form>
			<ul
				className="list"
				style={{ borderColor: mode == "dark" ? "#555" : "#ccc" }}>
				{data.map(item => {
					return (
						<Item
							key={item.id}
							item={item}
							remove={remove}
						/>
					);
				})}
			</ul>
		</div>
	);
}
