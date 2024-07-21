import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ModalSelector from "react-native-modal-selector";
import {
  TextInput,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native";
import Toast from "react-native-toast-message";
// import DateTimePicker from "react-native-modal-datetime-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

// Style
import styles from "./styles";

// Constants
import { incomeSourceData } from "../../utils/constants";

// Redux
import { addIncome } from "../../slices/incomeSlice";

export default function AddIncomeForm() {
  const user = useSelector((state) => state.user.user);
  const [incomeAmount, setIncomeAmount] = useState("");
  let date = Date.now();
  const [incomeDate, setIncomeDate] = useState(new Date(date));
  const [incomeDateReal, setIncomeDateReal] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
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

  const handleDatePicked = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setIncomeDate(currentDate);
    setIncomeDateReal(dayjs(currentDate).format("YYYY-MM-DD"));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleAddIncome = () => {
    setErrorMessage("");
    setIsLoading(true);

    const newIncome = {
      income_amount: parseFloat(incomeAmount),
      income_date: incomeDateReal,
      income_reason: incomeReason,
      income_comment: incomeComment,
      user_id: user._id,
    };

    dispatch(addIncome(newIncome))
      .unwrap()
      .then((res) => {
        setIncomeAmount("");
        setIncomeDateReal("");
        setIncomeReason("");
        setIncomeComment("");
        setIsError(false);
        // setErrorMessage("Income added successfully.");
        Toast.show({
          type: "success",
          text1: "Income added successfully.",
        });
      })
      .catch((err) => {
        setIsError(true);
        // setErrorMessage("There was a problem adding the income.");
        Toast.show({
          type: "error",
          text1: "There was a problem adding the income.",
        });
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
          value={incomeDateReal}
          onFocus={showDatepicker}
          onPress={showDatepicker}
        />
        {/* <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={handleDatePicked}
          onCancel={hideDateTimePicker}
        /> */}
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={incomeDate}
            mode={mode}
            onChange={handleDatePicked}
          />
        )}
        <ModalSelector
          data={incomeSourceData}
          initValue="Select income source *"
          onChange={(option) => setIncomeReason(option.label)}
          style={styles.input_select}
          initValueTextStyle={{ color: "#000" }}
          selectTextStyle={{ endFillColor: "#000" }}
        >
          <TextInput
            style={[styles.input, { marginLeft: -7, color: "#111" }]}
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
