import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Text,
  FlatList,
} from "react-native";

// Styles
import styles from "./styles";

// Components
import DebtActivityCard from "../../components/DebtActivityCard";
import DashboardCard from "../../components/DashboardCard";

export default function Debt() {
  const debts = useSelector((state) => state.debts.debts);
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  const currentMonthDebt = debts.filter((debt) => {
    const debtDate = dayjs(debt.debt_date_time);
    return debtDate.month() === currentMonth && debtDate.year() === currentYear;
  });

  const totalAmountOfDebt = currentMonthDebt.reduce((sum, expense) => {
    return sum + expense.debt_amount;
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container_one}>
          <Image
            source={require("../../assets/credit-card-payment.png")}
            style={styles.header_image}
          />
          <Text style={styles.text_one}>Your Debts</Text>
        </View>
        <View style={styles.container_two}>
          <DashboardCard
            intro_text="Your Debt as of"
            amount={totalAmountOfDebt}
            image={require("../../assets/debt.png")}
            color="#FC819E"
          />
        </View>
        <Text style={styles.text_two}>Recent Debts</Text>
        <View>
          <FlatList
            data={debts}
            renderItem={({ item }) => <DebtActivityCard activity={item} />}
            keyExtractor={(item) => item._id}
            // ListHeaderComponent={renderRecentActivity}
            contentContainerStyle={styles.list_two}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
