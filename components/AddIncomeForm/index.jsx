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

// Constants
import { incomeSourceData } from "../../utils/constants";

// Redux
import { addIncome } from "../../slices/incomeSlice";

export default function AddIncomeForm() {
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeDate, setIncomeDate] = useState(null);
  const [incomeReason, setIncomeReason] = useState("");
  const [incomeComment, setIncomeComment] = useState("");
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
    setIncomeDate(dayjs(date).format("YYYY-MM-DD"));
    hideDateTimePicker();
  };

  const handleAddIncome = () => {
    setErrorMessage("");
    setIsLoading(true);

    const newIncome = {
      income_amount: parseFloat(incomeAmount),
      income_date: incomeDate,
      income_reason: incomeReason,
      income_comment: incomeComment,
    };

    dispatch(addIncome(newIncome))
      .unwrap()
      .then((res) => {
        setIncomeAmount("");
        setIncomeDate(null);
        setIncomeReason("");
        setIncomeComment("");
        setIsError(false);
        setErrorMessage("Income added successfully.");
      })
      .catch((err) => {
        setIsError(true);
        setErrorMessage("There was a problem adding the income.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <View style={styles.container_two}>
        <Text style={styles.text_two}>Add your incomes</Text>
        {errorMessage !== "" ? (
          <Text style={[styles.text_one, { color: isError ? "red" : "green" }]}>
            {errorMessage}
          </Text>
        ) : (
          ""
        )}
        <TextInput
          style={styles.input}
          placeholder="Income Amount *"
          keyboardType="numeric"
          value={incomeAmount}
          onChangeText={setIncomeAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Income Date (YYYY-MM-DD) *"
          value={incomeDate}
          onFocus={showDateTimePicker}
          onPress={showDateTimePicker}
        />
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={handleDatePicked}
          onCancel={hideDateTimePicker}
        />
        <ModalSelector
          data={incomeSourceData}
          initValue="Select income source *"
          onChange={(option) => setIncomeReason(option.label)}
          style={styles.input_select}
          // initValueTextStyle={{ color: "#000" }}
          selectTextStyle={{ endFillColor: "#000" }}
        >
          <TextInput
            style={[styles.input, { marginLeft: -7 }]}
            editable={false}
            placeholder="Select income source *"
            value={incomeReason}
          />
        </ModalSelector>
        <TextInput
          style={[styles.input, { height: 60 }]}
          placeholder="Comment (optional)"
          value={incomeComment}
          onChangeText={setIncomeComment}
        />
        <Pressable style={styles.button_one} onPress={handleAddIncome}>
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
