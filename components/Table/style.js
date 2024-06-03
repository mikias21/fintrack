import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  tableContainer: {
    margin: 10,
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    padding: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
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
