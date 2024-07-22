import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#fff",
  },

  container_main_one: {
    position: "absolute",
    top: -30,
    width: "100%",
    zIndex: 1,
    backgroundColor: "#fff",
  },

  container_one: {
    padding: 18,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  container_two_main: {
    marginTop: 70,
  },

  container_two: {
    marginBottom: 10,
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

  text_two: {
    fontSize: 24,
    fontWeight: "bold",
    // marginVertical: 10,
    padding: 18,
  },
});
