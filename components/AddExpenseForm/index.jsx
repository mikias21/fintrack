import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ModalSelector from "react-native-modal-selector";
import {
  TextInput,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
// import DateTimePicker from "react-native-modal-datetime-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

// Style
import styles from "./styles";

// Redux
import { addExpense } from "../../slices/expenseSlice";

// Constants
import { reasonData } from "../../utils/constants";

export default function AddNewExpense() {
  const user = useSelector((state) => state.user.user);
  const [expenseAmount, setExpenseAmount] = useState("");
  let date = Date.now();
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [expenseDateReal, setExpenseDateReal] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [expenseReason, setExpenseReason] = useState("");
  const [expenseComment, setExpenseComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setErrorMessage("");
    };
  }, []);

  const handleDatePicked = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setExpenseDate(currentDate);
    setExpenseDateReal(dayjs(currentDate).format("YYYY-MM-DD"));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleAddExpense = () => {
    setErrorMessage("");
    setIsLoading(true);

    const newExpense = {
      expense_amount: parseFloat(expenseAmount),
      expense_date: expenseDateReal,
      expense_reason: expenseReason,
      expense_comment: expenseComment,
      user_id: user._id,
    };

    dispatch(addExpense(newExpense))
      .unwrap()
      .then((res) => {
        setExpenseAmount("");
        // setExpenseDate(new Date(date));
        setExpenseDateReal("");
        setExpenseReason("");
        setExpenseComment("");
        setIsError(false);
        // setErrorMessage("Expense added successfully.");
        Toast.show({
          type: "success",
          text1: "Expense added successfully.",
        });
      })
      .catch((err) => {
        setIsError(true);
        // setErrorMessage("There was a problem adding the expense.");
        Toast.show({
          type: "error",
          text1: "There was a problem adding the expense.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <View style={styles.formContainer}>
        <View style={styles.container_two}>
          <Text style={styles.text_two}>Add Expense</Text>
          {errorMessage !== "" ? (
            <Text
              style={[styles.text_one, { color: isError ? "red" : "green" }]}
            >
              {errorMessage}
            </Text>
          ) : (
            ""
          )}
          <TextInput
            style={styles.input}
            placeholder="Expense Amount *"
            keyboardType="numeric"
            value={expenseAmount}
            onChangeText={setExpenseAmount}
          />
          <TextInput
            style={styles.input}
            placeholder="Expense Date (YYYY-MM-DD) *"
            value={expenseDateReal}
            onFocus={showDatepicker}
            onPress={showDatepicker}
          />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={expenseDate}
              mode={mode}
              onChange={handleDatePicked}
            />
          )}
          <ModalSelector
            data={reasonData}
            initValue="Select Reason *"
            onChange={(option) => setExpenseReason(option.label)}
            style={styles.input_select}
            // initValueTextStyle={{ color: "#000" }}
            selectTextStyle={{ endFillColor: "#000" }}
          >
            <TextInput
              style={[styles.input, { marginLeft: -7 }]}
              editable={false}
              placeholder="Select Reason *"
              value={expenseReason}
            />
          </ModalSelector>
          <TextInput
            style={[styles.input, { height: 60 }]}
            placeholder="Comment (optional)"
            value={expenseComment}
            onChangeText={setExpenseComment}
          />
          <Pressable style={styles.button_one} onPress={handleAddExpense}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.text_three}>&#x2713;</Text>
            )}
          </Pressable>
        </View>
      </View>
    </>
  );
}
