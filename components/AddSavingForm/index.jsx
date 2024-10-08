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
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

// Style
import styles from "./styles";

// Redux
import { addSaving } from "../../slices/savingSlice";

export default function AddSavingsForm() {
  const user = useSelector((state) => state.user.user);
  const [savingAmount, setSavingAmount] = useState("");
  let date = Date.now();
  const [savingDate, setSavingDate] = useState(new Date(date));
  const [savingDateReal, setSavingDateReal] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [savingComment, setSavingComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDatePicked = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setSavingDate(currentDate);
    setSavingDateReal(dayjs(savingDate).format("YYYY-MM-DD"));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleAddSaving = () => {
    setIsLoading(true);

    const newSaving = {
      saving_amount: parseFloat(savingAmount),
      saving_date: savingDateReal,
      saving_comment: savingComment,
      user_id: user._id,
    };

    dispatch(addSaving({saving: newSaving, token: user.token}))
      .unwrap()
      .then((res) => {
        setSavingAmount("");
        setSavingDateReal("");
        setSavingComment("");
        Toast.show({
          type: "success",
          text1: "Saving added successfully.",
        });
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "There was a problem adding the saving.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <View style={styles.container_two}>
        <Text style={styles.text_two}>Add Savings</Text>
        <TextInput
          style={styles.input}
          placeholder="Saving Amount *"
          keyboardType="numeric"
          value={savingAmount}
          onChangeText={setSavingAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Saving Date (YYYY-MM-DD) *"
          value={savingDateReal}
          onFocus={showDatepicker}
          onPress={showDatepicker}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={savingDate}
            mode={mode}
            onChange={handleDatePicked}
          />
        )}
        <TextInput
          style={[styles.input, { height: 60 }]}
          placeholder="Comment (optional)"
          value={savingComment}
          onChangeText={setSavingComment}
        />
        <Pressable style={styles.button_one} onPress={handleAddSaving}>
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
