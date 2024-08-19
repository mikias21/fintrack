import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  main_logo_container: {
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 10,
  },

  logo_container: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },

  logo_image: {
    width: 70,
    height: 70,
  },

  scrollViewContent: {
    flexGrow: 1,
  },

  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container_two: {
    marginTop: 10,
  },

  container_three: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 18,
  },

  text_one: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 18,
  },

  bar_chart_container: {
    padding: 8,
    marginBottom: 10,
    backgroundColor: "#F6F5F2",
    marginHorizontal: 20,
    borderRadius: 20,
    paddingBottom: 20,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  list_one: {
    paddingBottom: 20,
  }
});
