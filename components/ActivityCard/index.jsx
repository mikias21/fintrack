import { View, Text } from "react-native";

// Styles
import styles from "./styles";

// Utils
import { formatDate } from "../../utils/utils";

export default function ActivityCard({ activity }) {
  return (
    <View style={styles.container_one}>
      <Text style={styles.text_one}>Expense Added</Text>
      <Text style={styles.text_two}>
        Added {activity.expense_amount}&#165; to {activity.expense_reason}
      </Text>
      <Text style={styles.text_three}>{formatDate(activity.expense_date)}</Text>
    </View>
  );
}
