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
import DateTimePicker from "react-native-modal-datetime-picker";
import dayjs from "dayjs";

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
  const [isPayDebtModalVisible, setIsPayDebtModalVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const [payAmount, setPayAmount] = useState("");
  const [payDate, setPayDate] = useState(null);
  const [isDateTimePickerVisible, setisDateTimePickerVisible] = useState(false);

  const showDateTimePicker = () => {
    setisDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setisDateTimePickerVisible(false);
  };

  const handleDatePicked = (date) => {
    setPayDate(dayjs(date).format("YYYY-MM-DD"));
    hideDateTimePicker();
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

    dispatch(deleteDebt(activity._id))
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
      debt_paid_date: payDate,
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
                  value={payDate}
                  onFocus={showDateTimePicker}
                  onPress={showDateTimePicker}
                />
                <DateTimePicker
                  isVisible={isDateTimePickerVisible}
                  onConfirm={handleDatePicked}
                  onCancel={hideDateTimePicker}
                />
                <Pressable style={styles.button_one} onPress={handlePayDebt}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.text_four}>&#x2713;</Text>
                  )}
                </Pressable>
              </View>
              <View style={styles.modalButtonContainerSpecial}>
                <TouchableOpacity onPress={togglePayDebtModal}>
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
