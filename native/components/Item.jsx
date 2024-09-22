import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import { formatDistanceToNow } from "date-fns";

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		gap: 10,
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
	},
	cardHeader: {
		flexDirection: "row",
		gap: 5,
		alignItems: "center",
		paddingTop: 5,
		marginBottom: 5,
	},
	userName: {
		color: "#240046",
		fontSize: 18,
		fontWeight: "bold",
	},
	timestamp: {
		fontSize: 16,
		color: "grey",
		flex: 1,
	},
	cardContent: {
		color: "#10002b",
		flex: 1,
	},
	content: {
		fontSize: 18,
		lineHeight: 26,
	},
	actionBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 12,
		marginRight: 30,
	},
	action: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},
});

export default function Item({ item, remove }) {
	return (
		<View style={styles.card}>
			<View>
				<Icon
					name="person-circle"
					size={52}
					color="#9d4edd"
				/>
			</View>
			<View style={styles.cardContent}>
				<View style={styles.cardHeader}>
					<Text style={styles.userName}>{item.user.name}</Text>
					<Text style={styles.timestamp}>
						• {formatDistanceToNow(item.created)}
					</Text>
					<TouchableOpacity onPress={() => {
                        remove.mutate(item.id);
                    }}>
						<Icon
							name="ellipsis-vertical"
							size={18}
							color="grey"
						/>
					</TouchableOpacity>
				</View>
				<Text style={styles.content}>{item.content}</Text>

				<View style={styles.actionBar}>
					<View style={styles.action}>
						<Icon
							name="heart-outline"
							color="deeppink"
							size={24}
						/>
						<Text>23</Text>
					</View>

					<View style={styles.action}>
						<Icon
							name="chatbubble-outline"
							color="green"
							size={24}
						/>
						<Text>11</Text>
					</View>

					<View style={styles.action}>
						<Icon
							name="share-social-outline"
							color="dodgerblue"
							size={24}
						/>
					</View>
				</View>
			</View>
		</View>
	);
}
