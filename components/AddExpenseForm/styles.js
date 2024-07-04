import { StyleSheet, Platform } from "react-native";

export default styles = StyleSheet.create({
  text_two: {
    fontSize: 17,
    marginBottom: 20,
  },

  text_one: {
    marginBottom: 15,
    color: "black",
  },

  formContainer: {
    // height: 500,
  },

  container_two: {
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    height: 350,
  },

  input: {
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    width: Platform.OS === "ios" ? 305 : 290,
  },

  input_select: {
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: "#e0e0e0",
    width: 300,
    color: "#000",
  },

  button_one: {
    width: 30,
    height: 30,
    backgroundColor: "#007bff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  text_three: {
    fontSize: 20,
    color: "#fff",
  },
});
