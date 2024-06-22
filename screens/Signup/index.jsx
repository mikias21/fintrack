import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

// styles
import styles from "./styles";

// Redux
import { signupUser } from "../../slices/userSlice";

function SignupScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSignup = () => {
    setLoading(true);
    setError("");

    const newUser = {
      user_name: userName,
      user_password: userPassword,
    };

    dispatch(signupUser(newUser))
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
            text1: "Signup successfully.",
          });
        }
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "There was a problem signing up.",
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
        <Text style={styles.tagline}>Hi there, welcome to fintrack.</Text>
      </View>

      <View style={styles.body}>
        {error ? (
          <Text style={[styles.notice_message, { color: "red" }]}>{error}</Text>
        ) : (
          <Text style={styles.notice_message}>
            Give us a unique name and password to identify you.
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
        <Pressable style={styles.login_button} onPress={handleSignup}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.text_one}>Create account</Text>
          )}
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Dont have an account? </Text>
        <TouchableOpacity onPress={() => navigation.push("Login")}>
          <Text style={styles.registerLink}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignupScreen;
