import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },

  container_one: {
    marginTop: 40,
  },

  container_two: {
    padding: 18,
  },

  list_one: {
    marginTop: 20,
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
});
