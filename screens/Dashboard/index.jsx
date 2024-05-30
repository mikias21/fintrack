import { View, Text, StyleSheet, SafeAreaView } from "react-native";

// Components
import Navbar from "../../components/Navbar";
import DashboardCard from "../../components/DashboardCard";

// Style
import styles from "./styles";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <View style={styles.container_one}>
        <DashboardCard
          intro_text="Expenses as of"
          amount="3000 RMB"
          image={require("../../assets/costs.png")}
          color="#FC819E"
        />
      </View>
      <View style={styles.container_two}>
        <DashboardCard
          intro_text="Saving as of"
          amount="2000 RMB"
          image={require("../../assets/piggy-bank.png")}
          color="#00A9FF"
        />
      </View>
    </SafeAreaView>
  );
}
