import { View, Text } from "react-native";

// Styles
import styles from "./styles";

export default function ActivityCard({ activity }) {
  return (
    <View style={styles.container_one}>
      <Text style={styles.text_one}>{activity.title}</Text>
      <Text style={styles.text_two}>{activity.details}</Text>
      <Text style={styles.text_three}>{activity.timestamp}</Text>
    </View>
  );
}
