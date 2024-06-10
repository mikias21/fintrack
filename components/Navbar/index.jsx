import { Avatar } from "react-native-elements";
import { View, Text, SafeAreaView } from "react-native";

// Styles
import styles from "./styles";

export default function Navbar() {
  let focused = true;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_one}>
        <Avatar
          rounded
          source={require("../../assets/man.png")}
          size={50}
          containerStyle={{
            borderColor: focused ? "lightblue" : "blue",
            borderWidth: focused ? 2 : 0,
          }}
        />
        <View style={styles.container_two}>
          <Text style={styles.text_one}>Evening,</Text>
          <Text style={styles.text_two}>Mikias! Welcome back</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
