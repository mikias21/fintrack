import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },

  container_main_one: {
    position: "absolute",
    top: 10,
    width: "100%",
    // zIndex: 1,
    backgroundColor: "#fff",
  },

  formContainer: {
    marginTop: 70,
  },

  container_one: {
    padding: 18,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  container_two: {
    paddingHorizontal: 18,
  },

  header_image: {
    height: 40,
    width: 40,
    marginRight: 10,
  },

  list_one: {
    marginVertical: -15,
    marginBottom: 10,
  },

  list_two: {
    marginBottom: 20,
  },

  text_one: {
    fontSize: 24,
    fontWeight: "bold",
    // marginVertical: 10,
  },

  text_two: {
    fontSize: 24,
    fontWeight: "bold",
    // marginVertical: 10,
    paddingTop: 18,
    paddingHorizontal: 18,
  },

  scrollView: {
    flex: 1,
    marginHorizontal: 10,
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },

  paginationDotActive: {
    backgroundColor: "#3498db",
  },

  listFooter: {
    width: 100,
  },

  touchableArea: {
    padding: 5,
  },
});
