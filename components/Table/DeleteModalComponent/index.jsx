import {
    View,
    Text,
    TouchableOpacity,
    Modal,
  } from "react-native";

import ToastManager from "toastify-react-native";

import styles from "./style";

export default DeleteModalComponent = ({ isVisible, toggleDeleteModal, handleDelete }) => {
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => toggleDeleteModal("")}
      >
        <View style={styles.modalContainer}>
          <ToastManager />
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>
              Are you sure you want to delete?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => toggleDeleteModal("")}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
}