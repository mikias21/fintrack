import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container_main_one: {
    width: "100%",
    backgroundColor: "#fff",
  },

  container_one: {
    padding: 18,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  container_two: {
    marginBottom: 10,
  },

  header_image: {
    height: 30,
    width: 30,
    marginRight: 10,
  },

  text_one: {
    fontSize: 19,
    fontWeight: "bold",
  },

  text_two: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 7,
  },

  final_list: {
    marginBottom: 20,
  },

  subheader_container:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  checkboxContainer:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 10,
    marginTop: -20,
    marginBottom: -30,
  },

  checkbox:{
    padding: 0,
    marginRight: 5,
  }

});
