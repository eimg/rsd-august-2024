import { View, TextInput, Button, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

import { useMutation, useQueryClient } from "react-query";

const styles = StyleSheet.create({
	form: {
		padding: 20,
		gap: 8,
	},
	input: {
		padding: 10,
		fontSize: 18,
		height: 100,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
	},
	button: {
		flex: 1,
	},
});

export default function Add() {
	const [content, setContent] = useState("");

    const queryClient = useQueryClient();

	const addPost = useMutation(
		async () => {
			const res = await fetch("http://192.168.100.15:8080/posts", {
				method: "POST",
				body: JSON.stringify({ content }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			return res.json();
		},
		{
			onSuccess: async () => {
                await queryClient.invalidateQueries("posts");
                router.navigate("/");
            },
		}
	);

	return (
		<View style={styles.form}>
			<TextInput
				multiline
				placeholder="What's on your mind"
				style={styles.input}
				value={content}
				onChangeText={setContent}
			/>
			<Button
				title="Add"
				style={styles.button}
				onPress={addPost.mutate}
			/>
		</View>
	);
}
