import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import Toast from "react-native-toast-message";

// Icons
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Styles
import styles from "./styles";

// Utils
import { formatDate } from "../../utils/utils";

// Redux
import { deleteExpense } from "../../slices/expenseSlice";

export default function ExpenseActivityCard({ activity }) {
  const user = useSelector((state) => state.user.user);
  const [showComment, setShowComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleCommentSwitch = () => {
    setShowComment(!showComment);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleDelete = () => {
    setIsModalVisible(false);
    setIsLoading(true);

    const deleteDetails = { expenseID: activity._id, userID: user._id };
    dispatch(deleteExpense(deleteDetails))
      .unwrap()
      .then((res) => {
        Toast.show({
          type: "success",
          text1: "Expense has been deleted.",
        });
      })
      .catch((err) => {
        setIsError(true);
        // setErrorMessage("There was a problem deleting the expense.");
        Toast.show({
          type: "error",
          text1: "There was a problem deleting the expense.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container_one}>
      <View style={styles.container_two}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirm Deletion</Text>
              <Text style={styles.modalText}>
                Are you sure you want to delete this item?
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
                  onPress={toggleModal}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Text style={styles.text_one}>Expense Added</Text>
        <View style={styles.container_three}>
          <TouchableOpacity onPress={handleCommentSwitch}>
            {showComment ? (
              <MaterialIcons name="details" size={18} color="#00A9FF" />
            ) : (
              <MaterialCommunityIcons
                name="details"
                size={18}
                color="#00A9FF"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            {isLoading ? (
              <ActivityIndicator
                size={15}
                color="#FC819E"
                style={{ marginLeft: 15 }}
              />
            ) : (
              <AntDesign
                name="delete"
                size={15}
                color="#FC819E"
                style={{ marginLeft: 15 }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.text_two}>
        Added {activity.expense_amount || activity.income_amount} &#165; to{" "}
        {activity.expense_reason || activity.income_reason}
      </Text>
      {showComment && (
        <>
          {activity.expense_comment && (
            <Text style={styles.text_two}>{activity.expense_comment}</Text>
          )}
          {!activity.expense_comment && (
            <Text style={styles.text_two}>No comment</Text>
          )}
        </>
      )}

      {activity.expense_date && (
        <Text style={styles.text_three}>
          {formatDate(activity.expense_date)}
        </Text>
      )}
    </View>
  );
}
