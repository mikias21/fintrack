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
import { StatusBar } from "expo-status-bar";

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
    const debtDate = dayjs(debt.debt_date);
    return debtDate.month() === currentMonth && debtDate.year() === currentYear;
  });

  const totalDebtPaidInCurrentMonth = debts.reduce((totalPaid, debt) => {
    if (debt.debt_paid_details && Array.isArray(debt.debt_paid_details)) {
      const paidInCurrentMonth = debt.debt_paid_details.reduce(
        (sum, payment) => {
          const paymentDate = dayjs(payment.paid_date);
          if (
            paymentDate.month() === currentMonth &&
            paymentDate.year() === currentYear
          ) {
            return sum + payment.paid_amount;
          }
          return sum;
        },
        0
      );
      return totalPaid + paidInCurrentMonth;
    }
    return totalPaid;
  }, 0);

  const totalAmountOfDebt = debts.reduce((sum, expense) => {
    return sum + expense.debt_amount;
  }, 0);

  const renderHeader = () => (
    <>
      <View style={styles.card_container}>
        <View style={styles.container_two}>
          <DashboardCard
            intro_text="Your Debt as of"
            amount={totalAmountOfDebt}
            image={require("../../assets/debt.png")}
            color="#FC819E"
          />
        </View>
        <View style={styles.container_two}>
          <DashboardCard
            intro_text="Total debt payed"
            amount={totalDebtPaidInCurrentMonth}
            image={require("../../assets/borrow.png")}
            color="#00A9FF"
          />
        </View>
      </View>
      <Text style={styles.text_two}>Recent Debts</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_main_one}>
        <View style={styles.container_one}>
          <Image
            source={require("../../assets/credit-card-payment.png")}
            style={styles.header_image}
          />
          <Text style={styles.text_one}>Your Debts</Text>
        </View>
      </View>
      <FlatList
        data={[{ key: "header" }]}
        renderItem={() => renderHeader()}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <View style={styles.list_two}>
            <FlatList
              data={debts}
              renderItem={({ item }) => <DebtActivityCard activity={item} />}
              keyExtractor={(item) => item._id}
            />
          </View>
        )}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
