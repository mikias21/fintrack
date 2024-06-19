import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  scrollContainer: {
    // padding: 10,
    margin: 18,
  },

  parentContainer: {
    borderColor: "whitesmoke",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    // elevation: 5,
    // backgroundColor: "#fff",
    padding: 7,
  },

  row_first: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    // height: 1,
  },

  row_last: {
    marginTop: -38,
    flexWrap: "wrap",
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: -15,
  },

  text_one: {
    fontSize: 18,
    marginBottom: 15,
    padding: 7,
    fontWeight: "bold",
  },

  box: {
    width: "22%",
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 5,
    margin: "1%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  month: {
    fontSize: 12,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 14,
    color: "#28a745",
    marginTop: 5,
  },
});
