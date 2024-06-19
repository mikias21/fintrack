import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  modalContent: {
    backgroundColor: "whitesmoke",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    marginHorizontal: 20,
  },

  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  modalButtonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },

  deleteButton: {
    backgroundColor: "#FC819E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 10,
  },

  cancelButton: {
    backgroundColor: "#afaeae",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 10,
  },

  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  detailsModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  detailsModalContent: {
    backgroundColor: "whitesmoke",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    width: "90%", // Adjust the width for both iOS and Android
    maxWidth: 500, // Limit the maximum width
  },

  detailsModalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  detailsModalDetailsContainer: {
    width: "100%",
    marginBottom: 20,
  },

  detailsModalExpenseLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    flexWrap: "wrap", // Ensure text wraps to next line if too long
  },

  detailsModalExpenseLabelText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1, // Allow the label text to take up available space
  },

  detailsModalExpenseLabelValue: {
    fontSize: 16,
    color: "#333",
    flex: 1, // Allow the value text to take up available space
    textAlign: "right", // Align the value text to the right
    flexWrap: "wrap", // Ensure text wraps to next line if too long
  },

  detailsModalButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },

  detailsCloseButton: {
    backgroundColor: "#afaeae",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  detailsModalButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  tableContainer: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 18,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },

  text_one: {
    fontSize: 18,
    marginBottom: 15,
    padding: 7,
    fontWeight: "bold",
    color: "#333",
  },

  container_three: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#00A9FF",
    padding: 15,
    borderRadius: 5,
  },

  headerText: {
    flex: 1,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  rowContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
    alignItems: "center",
  },

  rowText: {
    flex: 1,
    textAlign: "center",
    color: "#555",
  },
});
