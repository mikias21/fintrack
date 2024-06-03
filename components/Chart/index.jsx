import { useEffect, useState } from "react";
import { View } from "react-native";
// import { BarChart } from "react-native-chart-kit";
import { BarChart } from "react-native-chart-kit";

// Style
import styles from "./styles";

// Utils
import { getMonthlyExpenseData } from "../../utils/data_processor";

export default function Chart({ data }) {
  const monthlyData = getMonthlyExpenseData(data);

  console.log(monthlyData);

  return (
    <View style={styles.container}>
      {monthlyData.labels && (
        <BarChart
          data={{
            labels: monthlyData.labels,
            datasets: [
              {
                data: monthlyData.expenseAmounts,
              },
            ],
          }}
          width={320} // Adjust width as needed
          height={220} // Adjust height as needed
          yAxisLabel="$" // Label for y-axis
          chartConfig={{
            backgroundColor: "#fbfbfb",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0, // Display whole numbers for expense amounts
            color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Customize bar color
            style: {
              borderRadius: 16,
            },
          }}
          style={{ marginVertical: 8, marginLeft: -15 }} // Adjust styling as needed
        />
      )}
    </View>
  );
}
