import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container_one: {
    padding: 18,
    // backgroundColor: "#FC819E",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 5,
  },

  text_one: {
    padding: 5,
    color: "whitesmoke",
    fontWeight: "900",
    fontSize: 17,
  },

  text_two: {
    padding: 5,
    color: "whitesmoke",
    fontSize: 20,
    fontWeight: "900",
  },

  text_three: {
    padding: 5,
    color: "whitesmoke",
  },

  image_one: {
    height: 70,
    width: 70,
  },
});
