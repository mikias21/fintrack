import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";

// Icons
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Styles
import styles from "./styles";

// Utils
import { formatDate } from "../../utils/utils";

// Redux
import { deleteDebt } from "../../slices/debtSlice";
import { payDebt } from "../../slices/debtSlice";

export default function DebtActivityCard({ activity }) {
  const [showComment, setShowComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPayLoading, setIsPayLoading] = useState(false);
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

    dispatch(deleteDebt(activity._id))
      .unwrap()
      .then((res) => {
        console.log("deleted.");
      })
      .catch((err) => {
        setIsError(true);
        setErrorMessage("There was a problem deleting the debt.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePayDebt = () => {
    setIsPayLoading(true);

    dispatch(payDebt(activity._id))
      .unwrap()
      .then((res) => {
        console.log("payed.");
        setIsPayLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setErrorMessage("There was a problem paying the debt.");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View
      style={[
        styles.container_one,
        { backgroundColor: activity.debt_paid ? "#cbfae8" : "#ffdee6" },
      ]}
    >
      <View style={styles.container_two}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Are you sure you want to delete ?</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity onPress={handleDelete}>
                  <AntDesign name="delete" size={24} color="#ec5074" />
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleModal}>
                  <AntDesign
                    name="close"
                    size={24}
                    color="#afaeae"
                    style={{ marginLeft: 50 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {activity.debt_paid === true && (
          <Text style={styles.text_one}>Paid Debt</Text>
        )}
        {activity.debt_paid === false && (
          <Text style={styles.text_one}>Unpaid Debt</Text>
        )}
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
          {isPayLoading ? (
            <ActivityIndicator
              size={15}
              color="#00A9FF"
              style={{ marginLeft: 15 }}
            />
          ) : (
            <TouchableOpacity onPress={handlePayDebt}>
              {activity.debt_paid ? (
                <AntDesign
                  name="checkcircle"
                  size={18}
                  color="#00A9FF"
                  style={{ marginLeft: 15 }}
                />
              ) : (
                <AntDesign
                  name="checkcircleo"
                  size={18}
                  color="#00A9FF"
                  style={{ marginLeft: 15 }}
                />
              )}
            </TouchableOpacity>
          )}
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
        Debt added {activity.debt_amount} from {activity.debt_from}
      </Text>
      {showComment && (
        <>
          {activity.debt_comment && (
            <Text style={styles.text_two}>{activity.debt_comment}</Text>
          )}
          {!activity.debt_comment && (
            <Text style={styles.text_two}>No comment</Text>
          )}
        </>
      )}

      <Text style={styles.text_three}>{formatDate(activity.debt_date)}</Text>
    </View>
  );
}
