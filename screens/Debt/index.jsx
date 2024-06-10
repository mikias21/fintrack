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

  const renderHeader = () => (
    <>
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
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[{ key: "header" }]} // Dummy data for FlatList with a key
        renderItem={() => renderHeader()} // Render the header directly
        keyExtractor={(item) => item.key} // Key extractor for dummy data
        showsVerticalScrollIndicator={false} // Disable scroll indicator
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
    </SafeAreaView>
  );
}
