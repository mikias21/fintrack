import { StyleSheet, Platform } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  header: {
    marginTop: 150,
    padding: 10,
  },

  logo: {
    width: 100,
    height: 100,
    marginLeft: -30,
  },

  welcome_text: {
    padding: 10,
    marginTop: -15,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    // marginBottom: 5,
  },

  body: {
    marginBottom: 20,
    padding: 10,
  },

  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },

  tagline: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 10,
  },

  signInButtonGoogle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    marginHorizontal: 20,
  },

  signInButtonApple: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },

  footer: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  footerText: {
    fontSize: 16,
    color: "#aaa",
    paddingRight: 5,
  },

  registerLink: {
    color: "#00A9FF",
    fontWeight: "bold",
  },

  input: {
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    width: 280,
    width: Platform.OS === "ios" ? 305 : 290,
  },

  login_button: {
    width: 120,
    backgroundColor: "#007bff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  text_one: {
    color: "white",
  },

  notice_message: {
    marginBottom: 10,
    color: "#333",
  },
});
