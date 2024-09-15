import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: "purple",
					},
					headerTintColor: "#fff",
				}}>
				<Stack.Screen
					name="index"
					options={{ title: "Home" }}
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
