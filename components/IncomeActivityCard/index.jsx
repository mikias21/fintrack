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
import { deleteIncome } from "../../slices/incomeSlice";

export default function ActivityCard({ activity }) {
  const user = useSelector((state) => state.user.user);
  const [showComment, setShowComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
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

    const deleteDetails = { incomeID: activity._id, token: user.token };
    dispatch(deleteIncome(deleteDetails))
      .unwrap()
      .then((res) => {
        Toast.show({
          type: "success",
          text1: "Income has been deleted.",
        });
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "There was a problem deleting the income.",
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

        <Text style={styles.text_one}>Income Added</Text>
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
        Added {activity.income_amount} &#165; to {activity.income_reason}
      </Text>
      {showComment && (
        <>
          {activity.income_comment && (
            <Text style={styles.text_two}>{activity.income_comment}</Text>
          )}
          {!activity.income_comment && (
            <Text style={styles.text_two}>No comment</Text>
          )}
        </>
      )}
      {activity.income_date && (
        <Text style={styles.text_three}>
          {formatDate(activity.income_date)}
        </Text>
      )}
    </View>
  );
}
