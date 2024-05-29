import { View, Text, Image } from "react-native";

// Styles
import styles from "./styles";

// Utils
import { getReadableDateTime, getFormattedDate } from "../../utils/generators";

export default function DashboardCard() {
  return (
    <View style={styles.container_one}>
      <View style={styles.container_two}>
        <Text style={styles.text_one}>Expenses as of {getFormattedDate()}</Text>
        <Text style={styles.text_two}>3000 RMB</Text>
        <Text style={styles.text_three}>{getReadableDateTime()}</Text>
      </View>
      <Image
        source={require("../../assets/costs.png")}
        style={styles.image_one}
      />
    </View>
  );
}
