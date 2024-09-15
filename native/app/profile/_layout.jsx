import { Tabs } from "expo-router";
import Icon from "@expo/vector-icons/Ionicons";

export default function ProfileLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}>
			<Tabs.Screen
				name="user"
				options={{
					tabBarShowLabel: false,
					title: "User",
					tabBarIcon: ({ color }) => (
						<Icon
							size={28}
							name="person-circle-outline"
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					tabBarShowLabel: false,
					title: "Settings",
					tabBarIcon: ({ color }) => (
						<Icon
							size={28}
							name="settings-outline"
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
