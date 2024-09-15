import { Text, View, ScrollView } from "react-native";
import { Link } from "expo-router";

import { useQuery } from "react-query";

import Item from "../components/Item";

export default function Index() {
    const { data, isLoading, error } = useQuery("posts", async () => {
        const res = await fetch("http://localhost:8080/posts");
        return res.json();
    });

    if(isLoading) {
        return <View>
            <Text>Loading...</Text>
        </View>
    }

	return (
		<ScrollView>
			{data.map(item => <Item key={item.id} item={item} />)}
		</ScrollView>
	);
}
