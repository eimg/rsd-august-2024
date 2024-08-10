import { useState, useRef } from "react";
import Item from "./Item";

export default function App() {
    const inputRef = useRef();

	const [data, setData] = useState([
		{ id: 3, content: "Apple" },
		{ id: 2, content: "Orange" },
		{ id: 1, content: "Mango" },
	]);

    const add = content => {
        const id = data[0].id + 1;
        setData([{ id, content }, ...data]);
    }

	return (
		<div>
			<h1>Hello React</h1>
			<form onSubmit={e => {
                e.preventDefault();
                add(inputRef.current.value);
                e.currentTarget.reset();
            }}>
                <input type="text" ref={inputRef} />
                <button>Add</button>
            </form>
			<ul>
				{data.map(item => {
					return <Item key={item.id} content={item.content} />;
				})}
			</ul>
		</div>
	);
}
