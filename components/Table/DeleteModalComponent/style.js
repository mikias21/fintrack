import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
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
});