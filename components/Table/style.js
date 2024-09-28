import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
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

  filter_container: {
    marginTop: -10,
    marginBottom: 10,
    paddingLeft: 7,
    flexDirection: "row",
  },

  filter_item: {
    borderColor: "#ccc",
    borderWidth: 0.2,
    padding: 5,
    borderRadius: 10,
    width: 60,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
  },

  filter_text: {
    textAlign: "center",
    fontWeight: "600"
  }
});
