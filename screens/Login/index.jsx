import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// styles
import styles from "./styles";

// Redux
import { signinUser } from "../../slices/userSlice";

function LoginScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSignin = () => {
    setLoading(true);
    setError("");

    const user = {
      user_name: userName,
      user_password: userPassword,
    };

    dispatch(signinUser(user))
      .unwrap()
      .then((res) => {
        if (res["errors"] && res["errors"][1]) {
          setError(res.errors[1]["msg"]);
        } else if (res["errors"] && !res["errors"][1]) {
          res.errors[0]["msg"];
        } else if (res["message"]) {
          setError(res["message"]);
        } else {
          setError("");
          setLoading("");
          setUserName("");
          setUserPassword("");
          Toast.show({
            type: "success",
            text1: "Signin successfully.",
          });
        }
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "There was a problem signing in.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/icon.png")} // Path to your logo
          style={styles.logo}
        />
        <Text style={styles.title}>Fintrack</Text>
      </View>

      <View style={styles.welcome_text}>
        <Text style={styles.tagline}>
          Welcome back, manage you expenses with ease.
        </Text>
      </View>

      <View style={styles.body}>
        {error ? (
          <Text style={[styles.notice_message, { color: "red" }]}>{error}</Text>
        ) : (
          <Text style={styles.notice_message}>
            Fill in your account credentials.
          </Text>
        )}
        <TextInput
          style={styles.input}
          onChangeText={setUserName}
          value={userName}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          onChangeText={setUserPassword}
          value={userPassword}
          placeholder="Password"
          secureTextEntry
        />
        <Pressable style={styles.login_button} onPress={handleSignin}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.text_one}>Login</Text>
          )}
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Dont have an account? </Text>
        <TouchableOpacity onPress={() => navigation.push("Signup")}>
          <Text style={styles.registerLink}>Register Now</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default LoginScreen;
