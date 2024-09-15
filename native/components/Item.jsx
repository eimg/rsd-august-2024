import { View, Text, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#bbb",
    },
    cardHeader: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginBottom: 10
    },
    content: {
        fontSize: 18,
    }
});

export default function Item({ item }) {
    return (
		<View style={styles.card}>
			<View style={styles.cardHeader}>
				<Icon
					name="person-circle"
					size={32}
				/>
                <Text>{item.created}</Text>
			</View>
			<Text style={styles.content}>
				{item.content}
			</Text>
		</View>
	);
}
