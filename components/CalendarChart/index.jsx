import { View, Dimensions, Text, ScrollView } from "react-native";

// Style
import styles from "./styles";

// Utils
import { getMonthlyExpenseData } from "../../utils/data_processor";

export default function CalendarChart({ data }) {
  const monthlyData = getMonthlyExpenseData(data);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.parentContainer}>
        <Text style={styles.text_one}>Expense Calendar</Text>
        <View style={styles.row_first}>
          <View style={[styles.box, styles.firstBox]}></View>
          <View style={[styles.box, styles.firstBox]}></View>
          <View style={[styles.box, styles.firstBox]}></View>
          <View style={[styles.box, styles.firstBox]}>
            <Text style={styles.month}>{monthlyData.labels[0]}</Text>
            <Text style={styles.amount}>
              &#165; {monthlyData.expenseAmounts[0].toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          {monthlyData.expenseAmounts.slice(1, 9).map((amount, index) => (
            <View key={index + 1} style={[styles.box, styles.firstBox]}>
              <Text style={styles.month}>{monthlyData.labels[index + 1]}</Text>
              <Text style={styles.amount}>&#165; {amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.row_first, styles.row_last]}>
          <View style={[styles.box, styles.firstBox]}>
            <Text style={styles.month}>{monthlyData.labels[9]}</Text>
            <Text style={styles.amount}>
              &#165; {monthlyData.expenseAmounts[9].toFixed(2)}
            </Text>
          </View>
          <View style={[styles.box, styles.firstBox]}>
            <Text style={styles.month}>{monthlyData.labels[10]}</Text>
            <Text style={styles.amount}>
              &#165; {monthlyData.expenseAmounts[10].toFixed(2)}
            </Text>
          </View>
          <View style={[styles.box, styles.firstBox]}>
            <Text style={styles.month}>{monthlyData.labels[11]}</Text>
            <Text style={styles.amount}>
              &#165; {monthlyData.expenseAmounts[11].toFixed(2)}
            </Text>
          </View>
          <View style={[styles.box, styles.firstBox]}></View>
        </View>
      </View>
    </ScrollView>
  );
}
