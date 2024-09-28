import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
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
        width: "90%",
        maxWidth: 500,
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
        flexWrap: "wrap",
      },
    
      detailsModalExpenseLabelText: {
        fontSize: 16,
        fontWeight: "bold",
        flex: 1,
      },
    
      detailsModalExpenseLabelValue: {
        fontSize: 16,
        color: "#333",
        flex: 1,
        textAlign: "right",
        flexWrap: "wrap",
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
});