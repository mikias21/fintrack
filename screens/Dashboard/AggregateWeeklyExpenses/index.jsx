import { Text } from "react-native";

import {
    startOfWeek,
    endOfWeek,
    parseISO,
    format,
    isWithinInterval,
  } from "date-fns";
  

const AggregateWeeklyExpenses = (data) => {
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 0 }); // Week starts on Sunday
    const weekEnd = endOfWeek(now, { weekStartsOn: 0 });

    const formatNumber = (value) => {
        if (value === 0) return '0';
        if (value >= 1_000_000) return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (value >= 1_000) return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
        return value.toString();
      };
    
      const scaleNumber = (value) => {
        if (value >= 100 && value <= 999) {
          return value * 0.007;
        } else if (value >= 1000 && value <= 9999) {
          return value * 0.005;
        } else if (value >= 10000 && value <= 99999) {
          return value * 0.00066;
        } else if (value > 100000) {
          return value * 0.0000094;
        }
        return value;
      }; 
  
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const aggregatedData = Array(7).fill(0);
  
    data.forEach((item) => {
      const expenseDate = parseISO(item.expense_date);
      if (isWithinInterval(expenseDate, { start: weekStart, end: weekEnd })) {
        const dayIndex = expenseDate.getDay(); 
        aggregatedData[dayIndex] += item.expense_amount;
      }
    });
  
    return aggregatedData.map((value, index) => {
      return {
        value: scaleNumber(value),
        label: daysOfWeek[index],
        frontColor: "#F0ABFC",
        topLabelComponent: () => (
          <Text
            style={{
              color: "#3E3232",
              fontSize: 7,
              marginBottom: 2,
              fontWeight: "900",
            }}
          >
            {formatNumber(value)} &#165;
          </Text>
        ),
      };
    });
  };

export default AggregateWeeklyExpenses;