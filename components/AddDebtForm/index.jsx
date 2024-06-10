import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  TextInput,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import DateTimePicker from "react-native-modal-datetime-picker";
import dayjs from "dayjs";

// Styles
import styles from "./styles";

// Redux
import { addDebt } from "../../slices/debtSlice";

export default function AddDebtForm() {
  const [debtAmount, setDebtAmount] = useState("");
  const [debtDate, setDebtDate] = useState(null);
  const [debtFrom, setDebtFrom] = useState("");
  const [debtComment, setDebtComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDateTimePickerVisible, setisDateTimePickerVisible] = useState(false);
  const dispatch = useDispatch();

  const showDateTimePicker = () => {
    setisDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setisDateTimePickerVisible(false);
  };

  const handleDatePicked = (date) => {
    setDebtDate(dayjs(date).format("YYYY-MM-DD"));
    hideDateTimePicker();
  };

  const handleAddDebt = () => {
    setErrorMessage("");
    setIsLoading(true);

    const newDebt = {
      debt_amount: parseFloat(debtAmount),
      debt_date: debtDate,
      debt_from: debtFrom,
      debt_comment: debtComment,
    };

    dispatch(addDebt(newDebt))
      .unwrap()
      .then((res) => {
        setDebtAmount("");
        setDebtDate(null);
        setDebtFrom("");
        setDebtComment("");
        setIsError(false);
        // setErrorMessage("Debt added successfully.");
        Toast.show({
          type: "success",
          text1: "Debt added successfully.",
        });
      })
      .catch((err) => {
        setIsError(true);
        // setErrorMessage("There was a problem adding the debt.");
        Toast.show({
          type: "error",
          text1: "There was a problem adding the debt.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <View style={styles.container_two}>
        <Text style={styles.text_two}>Add your debts</Text>
        {errorMessage !== "" ? (
          <Text style={[styles.text_one, { color: isError ? "red" : "green" }]}>
            {errorMessage}
          </Text>
        ) : (
          ""
        )}
        <TextInput
          style={styles.input}
          placeholder="Debt Amount *"
          keyboardType="numeric"
          value={debtAmount}
          onChangeText={setDebtAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Debt taken Date (YYYY-MM-DD) *"
          value={debtDate}
          onFocus={showDateTimePicker}
          onPress={showDateTimePicker}
        />
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={handleDatePicked}
          onCancel={hideDateTimePicker}
        />
        <TextInput
          style={styles.input}
          placeholder="Debt taken from"
          value={debtFrom}
          onChangeText={setDebtFrom}
        />
        <TextInput
          style={[styles.input, { height: 60 }]}
          placeholder="Comment (optional)"
          value={debtComment}
          onChangeText={setDebtComment}
        />
        <Pressable style={styles.button_one} onPress={handleAddDebt}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.text_three}>&#x2713;</Text>
          )}
        </Pressable>
      </View>
    </>
  );
}
