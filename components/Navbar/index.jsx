import { Avatar } from "react-native-elements";
import { View, Text, SafeAreaView } from "react-native";

// Icons
import { MaterialIcons } from "@expo/vector-icons";

// Styles
import styles from "./styles";

export default function Navbar() {
  let focused = true;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_one}>
        <Avatar
          rounded
          source={{
            uri: "https://media.licdn.com/dms/image/C5603AQFi72nnJLHYYA/profile-displayphoto-shrink_800_800/0/1590515579343?e=1722470400&v=beta&t=LgwOBrvvMtFWh0Nl6rNbY8MePNZdHJ1bKf1Yoy2aE7w",
          }}
          size={50}
          containerStyle={{
            borderColor: focused ? "lightblue" : "blue",
            borderWidth: focused ? 2 : 0,
          }}
        />
        <View style={styles.container_two}>
          <Text style={styles.text_one}>Good Evening,</Text>
          <Text style={styles.text_two}>Mikias!</Text>
        </View>
      </View>
      <View style={styles.container_three}>
        <MaterialIcons
          name="dark-mode"
          size={28}
          color="black"
          style={{ marginRight: 20 }}
        />
        {/* <MaterialIcons name="settings" size={24} color="black" /> */}
      </View>
    </SafeAreaView>
  );
}
