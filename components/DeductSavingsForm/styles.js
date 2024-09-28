import { StyleSheet } from "react-native";
import { Platform } from "react-native";

const styles = StyleSheet.create({
  container_two: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 7,
  },

  text_one: {
    marginBottom: 15,
    color: "black",
  },

  text_two: {
    marginBottom: 15,
    color: "black",
    fontSize: 15,
    fontWeight: "900",
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

export default styles;
