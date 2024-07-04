import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  main_logo_container: {
    position: "absolute",
    top: 10,
    width: "100%",
    zIndex: 1,
    backgroundColor: "#fff",
    // elevation: 5,
  },

  logo_container: {
    marginTop: 10,
    // marginBottom: 90,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },

  logo_image: {
    width: 70,
    height: 70,
  },

  scrollViewContent: {
    flexGrow: 1,
  },

  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },

  container_one: {
    marginTop: 70,
  },

  container_two: {
    marginTop: 10,
  },

  container_three: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 18,
  },

  text_one: {
    fontSize: 24,
    fontWeight: "bold",
    // marginVertical: 10,
    padding: 18,
  },

  list_one: {
    paddingBottom: 20,
  },
});
