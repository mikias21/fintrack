import { useState } from "react";
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

import styles from "./styles";

import { deductSaving } from "../../slices/savingSlice";
import { useDispatch, useSelector } from "react-redux";

function DeductSavingsForm() {
  const user = useSelector((state) => state.user.user);
  const [spendingAmount, setSpendingAmount] = useState("");
  const [spendingDateReal, setSpendingDateReal] = useState("");
  const [spendingReason, setSpendingReason] = useState("");
  const [spendingDate, setSpendingDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDatePicked = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setSpendingDate(currentDate);
    setSpendingDateReal(dayjs(currentDate).format("YYYY-MM-DD"));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleDeductSaving = () => {
    setIsLoading(true);

    const newSpending = {
      spending_amount: parseFloat(spendingAmount),
      spending_date: spendingDateReal,
      spending_comment: spendingReason,
      token: user.token,
    };

    dispatch(deductSaving(newSpending))
      .unwrap()
      .then((res) => {
        setSpendingAmount("");
        setSpendingDateReal("");
        setSpendingReason("");
        if (res.message) {
          Toast.show({
            type: "error",
            text1: res.message,
          });
        } else {
          Toast.show({
            type: "success",
            text1: "Saving deducted successfully.",
          });
        }
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: err,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.container_two}>
        <Text style={styles.text_two}>Spending from your savings</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Spending Amount *"
            keyboardType="numeric"
            value={spendingAmount}
            onChangeText={setSpendingAmount}
          />
          <TextInput
            style={styles.input}
            placeholder="Spending Date (YYYY-MM-DD) *"
            value={spendingDateReal}
            onFocus={showDatepicker}
            onPress={showDatepicker}
          />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={spendingDate}
              mode={mode}
              onChange={handleDatePicked}
            />
          )}
          <TextInput
            style={[styles.input, { height: 60 }]}
            placeholder="Specify spending reason*"
            value={spendingReason}
            onChangeText={setSpendingReason}
          />
          <Pressable style={styles.button_one} onPress={handleDeductSaving}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.text_three}>&#x2713;</Text>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default DeductSavingsForm;
