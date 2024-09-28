import {
  View,
  Image,
  Text,
} from "react-native";

import DashboardCard from "../../../components/DashboardCard";

import styles from "../styles";

const HeaderComponent = ({totalAmountOfDebt, totalDebtPaidInCurrentMonth}) => (
    <>
      <View style={styles.container_main_one}>
        <View style={styles.container_one}>
          <Image
            source={require("../../../assets/credit-card-payment.png")}
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
            image={require("../../../assets/debt.png")}
            color="#FC819E"
          />
        </View>
        <View style={styles.container_two}>
          <DashboardCard
            intro_text="Total debt payed"
            amount={totalDebtPaidInCurrentMonth}
            image={require("../../../assets/borrow.png")}
            color="#00A9FF"
          />
        </View>
      </View>
    </>
  );

export default HeaderComponent;