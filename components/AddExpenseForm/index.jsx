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
import DateTimePicker from "react-native-modal-datetime-picker";
import dayjs from "dayjs";

// Style
import styles from "./styles";

// Service
import { addExpense } from "../../slices/expenseSlice";

// Constants
import { reasonData } from "../../utils/constants";

export default function AddNewExpense() {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(null);
  const [expenseReason, setExpenseReason] = useState("");
  const [expenseComment, setExpenseComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDateTimePickerVisible, setisDateTimePickerVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setErrorMessage("");
    };
  }, []);

  const showDateTimePicker = () => {
    setisDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setisDateTimePickerVisible(false);
  };

  const handleDatePicked = (date) => {
    setExpenseDate(dayjs(date).format("YYYY-MM-DD"));
    hideDateTimePicker();
  };

  const handleAddExpense = () => {
    setErrorMessage("");
    setIsLoading(true);

    const newExpense = {
      expense_amount: parseFloat(expenseAmount),
      expense_date: expenseDate,
      expense_reason: expenseReason,
      expense_comment: expenseComment,
    };

    dispatch(addExpense(newExpense))
      .unwrap()
      .then((res) => {
        setExpenseAmount("");
        setExpenseDate(null);
        setExpenseReason("");
        setExpenseComment("");
        setIsError(false);
        setErrorMessage("Expense added successfully.");
      })
      .catch((err) => {
        setIsError(true);
        setErrorMessage("There was a problem adding the expense.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <View style={styles.container_two}>
        <Text style={styles.text_two}>Add Expense</Text>
        {errorMessage !== "" ? (
          <Text style={[styles.text_one, { color: isError ? "red" : "green" }]}>
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
          value={expenseDate}
          onFocus={showDateTimePicker}
          onPress={showDateTimePicker}
        />
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={handleDatePicked}
          onCancel={hideDateTimePicker}
        />
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
    </>
  );
}
