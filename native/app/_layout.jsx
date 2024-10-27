import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Icon from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

import { router } from "expo-router";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: "#5a189a",
					},
					headerTintColor: "#fff",
				}}>
				<Stack.Screen
					name="index"
					options={{
						title: "Home",
						headerRight: () => {
							return (
								<TouchableOpacity
									onPress={() => router.push("/add")}>
									<Icon
										name="add"
										color="white"
										size={24}
									/>
								</TouchableOpacity>
							);
						},
					}}
				/>

				<Stack.Screen
					name="add"
					options={{ title: "Add Post" }}
				/>
				<Stack.Screen
					name="register/index"
					options={{ title: "Register" }}
				/>
				<Stack.Screen
					name="post/[id]"
					options={{ title: "Post" }}
				/>
			</Stack>
			<StatusBar style="light" />
		</QueryClientProvider>
	);
}
