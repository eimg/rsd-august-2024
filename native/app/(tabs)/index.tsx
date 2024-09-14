import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    label: {
        fontWeight: "bold",
        fontSize: 21,
    }
});

export default function Home() {
    return <View style={styles.container}>
        <Text style={styles.label}>Hello React Native</Text>
    </View>
}
