import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
