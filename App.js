import { Provider } from "react-redux";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector, useDispatch } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "./screens/Dashboard";
import AddItem from "./screens/AddItems";
import Expenses from "./screens/Expenses";
import IncomeSaving from "./screens/IncomeSaving";
import Debt from "./screens/Debt";
import LoginScreen from "./screens/Login";
import SignupScreen from "./screens/Signup";

// Redux
import store from "./store";
import { useEffect, useState } from "react";

// Local storage
import { getToken } from "./utils/storage";

// Redux
import { verifyToken } from "./slices/userSlice";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
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
);

const AppNavigator = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      try{
        const savedToken = await getToken('token');
        setToken(savedToken);
      }catch(error){
        setToken(null);
      }finally{
        setLoading(false);
      }
    }

    fetchToken();
  }, [])

  useEffect(() => {
    if(token){
      dispatch(verifyToken(token))
        .unwrap()
        .then(res => {})
        .catch(err => {})
    }
  }, [dispatch, token]);

  const user = useSelector((state) => state.user.user);
  // const [user, setUser] = useState(null);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user?.id ? (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => (
  <Provider store={store}>
    <NavigationContainer styles={styles.container}>
      <AppNavigator />
    </NavigationContainer>
    <Toast />
  </Provider>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
