import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 18,
  },

  container_one: {
    marginTop: 40,
  },

  text_one: {
    fontSize: 20,
  },

  text_two: {
    fontSize: 17,
    marginBottom: 20,
  },

  container_two: {
    // flex: 1,
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  input: {
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    width: 280,
  },

  button_one: {
    width: 30,
    height: 30,
    backgroundColor: "#007bff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  text_three: {
    fontSize: 20,
    color: "#fff",
  },

  container_three: {
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginLeft: 10,
  },

  container_four: {
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginLeft: 10,
  },

  scrollView: {
    flex: 1,
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
