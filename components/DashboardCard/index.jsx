import { View, Text, Image } from "react-native";

// Styles
import styles from "./styles";

// Utils
import { getReadableDateTime, getFormattedDate } from "../../utils/generators";

export default function DashboardCard({ intro_text, amount, image, color }) {
  return (
    <View style={[styles.container_one, { backgroundColor: color }]}>
      <View style={styles.container_two}>
        <Text style={styles.text_one}>
          {intro_text} {getFormattedDate()}
        </Text>
        <Text style={styles.text_two}>{amount}</Text>
        <Text style={styles.text_three}>{getReadableDateTime()}</Text>
      </View>
      <Image source={image} style={styles.image_one} />
    </View>
  );
}
