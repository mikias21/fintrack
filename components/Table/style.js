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

  container_three: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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

  modalContainer: {
    flex: 1,
    justifyContent: "space-start",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  modalContent: {
    backgroundColor: "whitesmoke",
    padding: 22,
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    marginTop: 150,
    width: 300,
  },

  modalButtonContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 20,
  },

  modal_header_one: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },

  modal_expense_label: {
    display: "flex",
    flexDirection: "row",
  },

  modal_expense_label_text: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: "700",
  },

  modal_expense_label_value: {
    paddingVertical: 10,
  },
});
