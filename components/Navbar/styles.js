import { StyleSheet, Platform } from "react-native";

export default styles = StyleSheet.create({
  container: {
    // marginTop: -70,
    padding: 18,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  container_one: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: Platform.OS === "ios" ? 18 : 0,
  },

  container_two: {
    marginLeft: 10,
  },

  container_three: {
    display: "flex",
    flexDirection: "row",
  },

  text_one: {
    fontSize: 15,
    fontWeight: "700",
    color: "gray",
  },

  text_two: {
    fontSize: 13,
    marginTop: 3,
    fontWeight: "900",
  },
});
