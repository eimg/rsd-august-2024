import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import Item from "../components/Item";

import { useQuery } from "react-query";

const api = "http://localhost:8080/posts";

async function fetchPost(id) {
    const res = await fetch(`${api}/${id}`);
    return res.json();
}

export default function Post() {
	const { id } = useParams();
    const { data, isLoading } = useQuery(["post", id], () => fetchPost(id));

	const remove = id => {
		fetch(`${api}/${id}`, { method: "DELETE" });
		setData(data.filter(item => item.id !== id));
	};

    if(isLoading) {
        return <Box>Loading...</Box>;
    }

	return (
		<Box>
			<Item
				primary
				key={data.id}
				item={data}
				remove={remove}
			/>
		</Box>
	);
}
