import { Provider } from "react-redux";
import { StyleSheet, View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

// Screens
import HomeScreen from "./screens/Dashboard";
import AddItem from "./screens/AddItems";
import Expenses from "./screens/Expenses";
import IncomeSaving from "./screens/IncomeSaving";
import Debt from "./screens/Debt";

// Redux
import store from "./store";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer styles={styles.container}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "space-dashboard";
              } else if (route.name === "Income") {
                iconName = "credit-card-off";
              } else if (route.name === "Add") {
                iconName = "add-circle";
              } else if (route.name === "Expenses") {
                iconName = "attach-money";
              } else if (route.name === "Debt") {
                iconName = "settings";
              }

              return (
                <MaterialIcons
                  name={iconName}
                  size={28}
                  color={focused ? color : color}
                />
              );
            },
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: [
              {
                paddingBottom: 20,
                paddingTop: 20,
                height: 70,
              },
              null,
            ],
            headerShown: false,
            tabBarShowLabel: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Income" component={IncomeSaving} />
          <Tab.Screen name="Add" component={AddItem} />
          <Tab.Screen name="Expenses" component={Expenses} />
          <Tab.Screen name="Debt" component={Debt} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
