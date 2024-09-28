import dayjs from "dayjs";
import { useSelector } from "react-redux";
import {
  SafeAreaView,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";

// Styles
import styles from "./styles";

// Components
import HeaderComponent from "./HeaderComponent";
import DebtListComponent from "./DebtListComponent";
import DebtFooterComponent from "./FooterComponent";
import DebtFilterComponent from "./FilterDebtComponent";

export default function Debt() {
  const debts = useSelector((state) => state.debts.debts);
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();
  const [isSelected, setSelection] = useState(false);
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    setFilteredData(debts);
  }, [])

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
      const data = debts.filter(item => item.debt_paid === false);
      setFilteredData(data);
    }else{
      setFilteredData(debts);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[{ key: "header" }]}
        ListHeaderComponent={() => (
          <>
            <HeaderComponent 
              totalAmountOfDebt={totalAmountOfDebt} 
              totalDebtPaidInCurrentMonth={totalDebtPaidInCurrentMonth} 
            />
            <DebtFilterComponent isSelected={isSelected} filterDebtData={filterDebtData} />
          </>
        )}
        ListFooterComponent={DebtFooterComponent}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <DebtListComponent filteredData={filteredData} />
        )}
      />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
    </SafeAreaView>
  );
}
