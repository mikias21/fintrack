import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextInput,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

// Styles
import styles from "./styles";

// Redux
import { addDebt } from "../../slices/debtSlice";

export default function AddDebtForm() {
  const user = useSelector((state) => state.user.user);
  const [debtAmount, setDebtAmount] = useState("");
  let date = Date.now();
  const [debtDate, setDebtDate] = useState(new Date(date));
  const [debtDateReal, setDebtDateReal] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [debtFrom, setDebtFrom] = useState("");
  const [debtComment, setDebtComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDatePicked = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDebtDate(currentDate);
    setDebtDateReal(dayjs(currentDate).format("YYYY-MM-DD"));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleAddDebt = () => {
    setErrorMessage("");
    setIsLoading(true);

    const newDebt = {
      debt_amount: parseFloat(debtAmount),
      debt_date: debtDateReal,
      debt_from: debtFrom,
      debt_comment: debtComment,
      user_id: user._id,
    };

    dispatch(addDebt({debt: newDebt, token: user.token}))
      .unwrap()
      .then((res) => {
        setDebtAmount("");
        setDebtDateReal("");
        setDebtFrom("");
        setDebtComment("");
        Toast.show({
          type: "success",
          text1: "Debt added successfully.",
        });
      })
      .catch((err) => {
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
          value={debtDateReal}
          onFocus={showDatepicker}
          onPress={showDatepicker}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={debtDate}
            mode={mode}
            onChange={handleDatePicked}
          />
        )}
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
