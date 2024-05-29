import { View, Text, StyleSheet, SafeAreaView } from "react-native";

// Components
import Navbar from "../../components/Navbar";
import DashboardCard from "../../components/DashboardCard";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <DashboardCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
