import { Provider } from "react-redux";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

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
                iconName = "home";
              } else if (route.name === "Income") {
                iconName = "piggy-bank";
              } else if (route.name === "Add") {
                iconName = "plus-circle";
              } else if (route.name === "Expenses") {
                iconName = "chart-line";
              } else if (route.name === "Debt") {
                iconName = "money-check-alt";
              }

              return (
                <FontAwesome5
                  name={iconName}
                  size={24}
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
      <Toast />
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
