import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import HomeScreen from "./screens/Dashboard";

import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            // let iconName;

            // if (route.name === "Home") {
            //   iconName = "home";
            // } else if (route.name === "Search") {
            //   iconName = "search";
            // } else if (route.name === "Notifications") {
            //   iconName = "notifications";
            // } else if (route.name === "Profile") {
            //   iconName = "person";
            // }

            // You can return any component that you like here!
            return (
              // <Icon name={iconName} type="material" color={color} size={size} />
              <AntDesign name="home" size={24} color="black" />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "#6200ee",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
