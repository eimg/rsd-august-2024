import { Text, View, ScrollView } from "react-native";
import { Link } from "expo-router";

import { useQuery, useMutation, useQueryClient } from "react-query";

import Item from "../components/Item";

export default function Index() {
	const queryClient = useQueryClient();

	const { data, isLoading, error } = useQuery("posts", async () => {
		const res = await fetch("http://192.168.100.15:8080/posts");
		return res.json();
	});

	const remove = useMutation(
		async id => {
			return fetch(`http://192.168.100.15:8080/posts/${id}`, {
				method: "DELETE",
			});
		},
		{
			onMutate: id => {
				queryClient.setQueryData("posts", old => {
					return old.filter(item => item.id !== id);
				});
			},
		},
	);

	if (isLoading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<ScrollView>
			{data.map(item => (
				<Item
					key={item.id}
					item={item}
					remove={remove}
				/>
			))}
		</ScrollView>
	);
}
