import {
    View,
    Text,
    TouchableOpacity,
    Modal,
  } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";

import styles from "./style";

export default DetailsModalComponent = ({ isVisible, toggleDetailsModal, item }) => {
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => toggleDetailsModal("")}
      >
        <View style={styles.detailsModalContainer}>
          <ToastManager />
          <View style={styles.detailsModalContent}>
            <Text style={styles.detailsModalHeader}>Expense Details</Text>
            <View style={styles.detailsModalDetailsContainer}>
              <View style={styles.detailsModalExpenseLabel}>
                <Text style={styles.detailsModalExpenseLabelText}>
                  Expense Date:
                </Text>
                <Text style={styles.detailsModalExpenseLabelValue}>
                  {item?.expense_date}
                </Text>
              </View>
              <View style={styles.detailsModalExpenseLabel}>
                <Text style={styles.detailsModalExpenseLabelText}>
                  Expense Reason:
                </Text>
                <Text style={styles.detailsModalExpenseLabelValue}>
                  {item?.expense_reason}
                </Text>
              </View>
              <View style={styles.detailsModalExpenseLabel}>
                <Text style={styles.detailsModalExpenseLabelText}>
                  Expense Amount:
                </Text>
                <Text style={styles.detailsModalExpenseLabelValue}>
                  {item?.expense_amount}
                </Text>
              </View>
              <View style={styles.detailsModalExpenseLabel}>
                <Text style={styles.detailsModalExpenseLabelText}>
                  Comment:
                </Text>
                <Text style={styles.detailsModalExpenseLabelValue}>
                  {item?.expense_comment}
                </Text>
              </View>
            </View>
            <View style={styles.detailsModalButtonContainer}>
              <TouchableOpacity
                onPress={() => toggleDetailsModal(null)}
                style={styles.detailsCloseButton}
              >
                <Text style={styles.detailsModalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
}