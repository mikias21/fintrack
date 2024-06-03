import { Provider } from "react-redux";
import { StyleSheet, View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

// Screens
import HomeScreen from "./screens/Dashboard";
import AddItem from "./screens/AddItems";

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
              } else if (route.name === "Search") {
                iconName = "credit-card-off";
              } else if (route.name === "Notifications") {
                iconName = "add-circle";
              } else if (route.name === "Profile") {
                iconName = "attach-money";
              } else if (route.name === "Settings") {
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
          <Tab.Screen name="Search" component={HomeScreen} />
          <Tab.Screen name="Notifications" component={AddItem} />
          <Tab.Screen name="Profile" component={HomeScreen} />
          <Tab.Screen name="Settings" component={HomeScreen} />
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
