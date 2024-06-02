import { View, FlatList, SafeAreaView, Text, Image } from "react-native";

// Icons
import { MaterialIcons } from "@expo/vector-icons";

// Components
import Navbar from "../../components/Navbar";
import ActivityCard from "../../components/ActivityCard";
import DashboardCard from "../../components/DashboardCard";

// Style
import styles from "./styles";

const recentActivities = [
  {
    id: "1",
    title: "Expense Added",
    details: "Added $50 to groceries",
    timestamp: "Today, 2:00 PM",
  },
  {
    id: "2",
    title: "Investment",
    details: "Invested $200 in stocks",
    timestamp: "Today, 10:30 AM",
  },
  {
    id: "3",
    title: "Expense Added",
    details: "Added $30 to entertainment",
    timestamp: "Yesterday, 8:45 PM",
  },
  {
    id: "4",
    title: "Income Added",
    details: "Received $500 from freelance work",
    timestamp: "Yesterday, 3:00 PM",
  },
];

export default function HomeScreen() {
  const renderHeader = () => (
    <>
      <View style={styles.logo_container}>
        <Image
          source={require("../../assets/logo2.jpg")}
          style={styles.logo_image}
        />
        <MaterialIcons
          name="dark-mode"
          size={28}
          color="black"
          style={{ marginRight: 20 }}
        />
      </View>
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
      <Text style={styles.text_one}>Recent Activities</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recentActivities}
        renderItem={({ item }) => <ActivityCard activity={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.list_one}
      />
    </SafeAreaView>
  );
}
