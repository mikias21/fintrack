import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  TextInput,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native";
import Toast from "react-native-toast-message";
import DateTimePicker from "react-native-modal-datetime-picker";
import dayjs from "dayjs";

// Style
import styles from "./styles";

// Redux
import { addSaving } from "../../slices/savingSlice";

export default function AddSavingsForm() {
  const [savingAmount, setSavingAmount] = useState("");
  const [savingDate, setSavingDate] = useState(null);
  const [savingComment, setSavingComment] = useState("");
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
    setSavingDate(dayjs(date).format("YYYY-MM-DD"));
    hideDateTimePicker();
  };

  const handleAddSaving = () => {
    setErrorMessage("");
    setIsLoading(true);

    const newSaving = {
      saving_amount: parseFloat(savingAmount),
      saving_date: savingDate,
      saving_comment: savingComment,
    };

    dispatch(addSaving(newSaving))
      .unwrap()
      .then((res) => {
        setSavingAmount("");
        setSavingDate(null);
        setSavingComment("");
        setIsError(false);
        // setErrorMessage("Income added successfully.");
        Toast.show({
          type: "success",
          text1: "Saving added successfully.",
        });
      })
      .catch((err) => {
        setIsError(true);
        // setErrorMessage("There was a problem adding the income.");
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
        {errorMessage !== "" ? (
          <Text style={[styles.text_one, { color: isError ? "red" : "green" }]}>
            {errorMessage}
          </Text>
        ) : (
          ""
        )}
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
          value={savingDate}
          onFocus={showDateTimePicker}
          onPress={showDateTimePicker}
        />
        {Platform.OS === "ios" ? (
          <DateTimePicker
            isVisible={isDateTimePickerVisible}
            onConfirm={handleDatePicked}
            onCancel={hideDateTimePicker}
          />
        ) : (
          <DateTimePicker
            isVisible={isDateTimePickerVisible}
            onConfirm={handleDatePicked}
            onCancel={hideDateTimePicker}
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
