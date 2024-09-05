import { Avatar } from "react-native-elements";
import { View, Text, SafeAreaView } from "react-native";

// Styles
import styles from "./styles";

export default function Navbar({user}) {
  let focused = true;

  function getTimeOfDay() {
    const currentHour = new Date().getHours();
    return currentHour < 12
      ? "Morning"
      : currentHour < 17
      ? "Afternoon"
      : "Evening";
  }

  const upperCaseName = user?.user_name[0].toUpperCase() + user?.user_name.slice(1, user?.user_name.length);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_one}>
        <Avatar
          rounded
          source={require("../../assets/man.png")}
          size={40}
          containerStyle={{
            borderColor: focused ? "lightblue" : "blue",
            borderWidth: focused ? 2 : 0,
          }}
        />
        <View style={styles.container_two}>
          <Text style={styles.text_one}>Good {getTimeOfDay()},</Text>
          <Text style={styles.text_two}>{upperCaseName}! Welcome back</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
