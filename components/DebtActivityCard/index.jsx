import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import Toast from "react-native-toast-message";
// import DateTimePicker from "react-native-modal-datetime-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

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
  const user = useSelector((state) => state.user.user);
  const [showComment, setShowComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPayLoading, setIsPayLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPayDebtModalVisible, setIsPayDebtModalVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const [payAmount, setPayAmount] = useState("");
  let date = Date.now();
  const [payDate, setPayDate] = useState(new Date(date));
  const [payDateReal, setPayDateReal] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const handleDatePicked = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setPayDate(currentDate);
    setPayDateReal(dayjs(currentDate).format("YYYY-MM-DD"));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleCommentSwitch = () => {
    setShowComment(!showComment);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const togglePayDebtModal = () => {
    setIsPayDebtModalVisible(!isPayDebtModalVisible);
  };

  const handleDelete = () => {
    setIsModalVisible(false);
    setIsLoading(true);

    const deleteDetails = { debtID: activity._id, userID: user._id };

    dispatch(deleteDebt(deleteDetails))
      .unwrap()
      .then((res) => {
        Toast.show({
          type: "success",
          text1: "Debt has been deleted.",
        });
      })
      .catch((err) => {
        setIsError(true);
        // setErrorMessage("There was a problem deleting the debt.");
        Toast.show({
          type: "success",
          text1: "There was a problem deleting the debt.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePayDebt = () => {
    setIsLoading(true);

    const paymentDetails = {
      debtID: activity._id,
      debt_paid_amount: parseFloat(payAmount),
      debt_paid_date: payDateReal,
      user_id: user._id,
    };

    dispatch(payDebt(paymentDetails))
      .unwrap()
      .then((res) => {
        setIsPayLoading(false);
        togglePayDebtModal();
        Toast.show({
          type: "success",
          text1: "Debt has been updated.",
        });
      })
      .catch((err) => {
        setIsError(true);
        Toast.show({
          type: "error",
          text1: "There was a problem updating your debt.",
        });
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
        {/* Delete Debt Modal */}
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

        {/* Pay Debt Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isPayDebtModalVisible}
          onRequestClose={togglePayDebtModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Put some details about the payment</Text>
              <View style={styles.container_two_form}>
                {errorMessage !== "" ? (
                  <Text
                    style={[
                      styles.text_one,
                      { color: isError ? "red" : "green" },
                    ]}
                  >
                    {errorMessage}
                  </Text>
                ) : (
                  ""
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Payment Amount *"
                  keyboardType="numeric"
                  value={payAmount}
                  onChangeText={setPayAmount}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Debt pay date (YYYY-MM-DD) *"
                  value={payDateReal}
                  onFocus={showDatepicker}
                  onPress={showDatepicker}
                />
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={payDate}
                    mode={mode}
                    onChange={handleDatePicked}
                  />
                )}
                <View style={styles.button_container_two}>
                  <Pressable style={styles.button_one} onPress={handlePayDebt}>
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.text_four}>&#x2713;</Text>
                    )}
                  </Pressable>
                  <Pressable
                    style={styles.button_two}
                    onPress={togglePayDebtModal}
                  >
                    <AntDesign name="close" style={styles.text_five} />
                  </Pressable>
                </View>
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
            <TouchableOpacity onPress={togglePayDebtModal}>
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

      {activity.debt_amount === 0 ? (
        <Text style={styles.text_two}>
          Debt taken from {activity.debt_from} has been fully paid
        </Text>
      ) : (
        <Text style={styles.text_two}>
          Debt added {activity.debt_amount} from {activity.debt_from}
        </Text>
      )}
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
