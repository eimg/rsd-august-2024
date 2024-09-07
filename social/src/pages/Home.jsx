import { useState, useEffect } from "react";

import { Box } from "@mui/material";

import Form from "../components/Form";
import Item from "../components/Item";

import { useApp } from "../ThemedApp";

const api = "http://localhost:8080/posts";

export default function Home() {
	const { showForm, setShowForm } = useApp();
	const [data, setData] = useState([]);

	useEffect(() => {
        fetch(api).then(async res => {
			const json = await res.json();
			setData(json);
		});

		// fetch(api)
		// 	.then(res => res.json())
		// 	.then(json => setData(json));

        // (async () => {
        //     const res = await fetch(api);
        //     const json = await res.json();
        //     setData(json);
        // })();
	}, []);

	const remove = id => {
        fetch(`${api}/${id}`, { method: 'DELETE' });
		setData(data.filter(item => item.id !== id));
	};

	const add = (content, name) => {
		const id = data[0].id + 1;
		setData([{ id, content, name }, ...data]);
	};

	return (
		<Box>
			{showForm && <Form add={add} />}

			{data.map(item => {
				return (
					<Item
						key={item.id}
						item={item}
						remove={remove}
					/>
				);
			})}
		</Box>
	);
}
