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
    justifyContent: "space-start",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  modalContent: {
    backgroundColor: "whitesmoke",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    marginTop: 150,
  },

  modalButtonContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
