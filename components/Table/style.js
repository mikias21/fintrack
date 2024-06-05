import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  tableContainer: {
    // margin: 10,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "whitesmoke",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 18,
  },

  text_one: {
    fontSize: 18,
    marginBottom: 15,
    padding: 7,
    fontWeight: "bold",
  },

  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#00A9FF",
    padding: 10,
    borderRadius: 5,
  },

  headerText: {
    flex: 1,
    fontWeight: "bold",
    color: "white",
  },
  rowContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  rowText: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  paginationText: {
    fontSize: 16,
    color: "#007BFF",
  },
  disabledText: {
    color: "#CCC",
  },
});
