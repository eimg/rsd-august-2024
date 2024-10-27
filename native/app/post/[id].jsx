import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Post() {
	const { id } = useLocalSearchParams();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}>
			<Text>Post - {id}</Text>
		</View>
	);
}
