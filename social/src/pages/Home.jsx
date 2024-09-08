import { Box } from "@mui/material";

import Form from "../components/Form";
import Item from "../components/Item";

import { useApp } from "../ThemedApp";

import { useQuery } from "react-query";

const api = "http://localhost:8080/posts";

async function fetchPosts() {
    const res = await fetch(api);
    return res.json();
}

export default function Home() {
	const { showForm } = useApp();
	const { data, error, isError, isLoading } = useQuery("posts", fetchPosts);

	const remove = id => {
        fetch(`${api}/${id}`, { method: 'DELETE' });
		setData(data.filter(item => item.id !== id));
	};

	const add = content => {
		fetch(api, {
            method: 'POST',
            body: JSON.stringify({ content }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async res => {
            const item = await res.json();
            setData([item, ...data]);
        });
	};

    if (isError) {
		return <Box>{error}</Box>;
	}

    if (isLoading) {
		return <Box>Loading...</Box>;
	}

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
