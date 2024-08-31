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
import CheckBox from 'react-native-check-box'
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

// Styles
import styles from "./styles";

// Components
import DebtActivityCard from "../../components/DebtActivityCard";
import DashboardCard from "../../components/DashboardCard";

export default function Debt() {
  const debts = useSelector((state) => state.debts.debts);
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();
  const [isSelected, setSelection] = useState(false);
  const [filteredData, setFilteredData] = useState(debts)

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

  const filterDebtData = () => {
    setSelection(!isSelected);
    if(!isSelected){
      const data = debts.filter(item => item.debt_paid === true);
      setFilteredData(data);
    }else{
      setFilteredData(debts);
    }
  }

  const renderHeader = () => (
    <>
      <View style={styles.container_main_one}>
        <View style={styles.container_one}>
          <Image
            source={require("../../assets/credit-card-payment.png")}
            style={styles.header_image}
          />
          <Text style={styles.text_one}>Your Debts</Text>
        </View>
      </View>
      
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
      
      <View style={styles.subheader_container}>
        <Text style={styles.text_two}>Recent Debts</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
              onClick={filterDebtData}
              isChecked={isSelected}
              leftText={"CheckBox"}
              style={styles.checkbox}
              checkedCheckBoxColor="#00A9FF"
          />
          <Text style={styles.label}>Unpaid debts only?</Text>
        </View>
      </View>
    </>
  );

  const renderFooter = () => (
    <>
      <View style={styles.final_list}></View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[{ key: "header" }]}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View style={styles.list_two}>
            <FlatList
              data={filteredData}
              renderItem={({ item }) => <DebtActivityCard activity={item} />}
              keyExtractor={(item) => item._id}
            />
          </View>
        )}
      />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
    </SafeAreaView>
  );
}
