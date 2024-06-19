import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container_one: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 7,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  container_two: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  container_three: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  text_one: {
    fontSize: 16,
    fontWeight: "bold",
  },

  text_two: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },

  text_three: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "whitesmoke",
    padding: 20,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteButton: {
    backgroundColor: "#FC819E",
    paddingVertical: 8, // Reduced padding
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 10,
  },

  cancelButton: {
    backgroundColor: "#afaeae",
    paddingVertical: 8, // Reduced padding
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 10,
  },

  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 14, // Reduced font size
    fontWeight: "bold",
  },
});
