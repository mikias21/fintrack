import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#fff",
  },

  container_one_main: {
    position: "absolute",
    top: 10,
    width: "100%",
    // zIndex: 1,
    backgroundColor: "#fff",
  },

  container_one: {
    padding: 18,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  container_two: {
    marginBottom: 10,
    marginTop: 70,
  },

  header_image: {
    height: 40,
    width: 40,
    marginRight: 10,
  },

  text_one: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
