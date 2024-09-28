import { View, Text } from 'react-native';
import CheckBox from 'react-native-check-box';
import styles from "../styles";

const DebtFilterComponent = ({ isSelected, filterDebtData }) => (
  <View style={styles.subheader_container}>
    <Text style={styles.text_two}>Recent Debts</Text>
    <View style={styles.checkboxContainer}>
      <CheckBox
        onClick={filterDebtData}
        isChecked={isSelected}
        leftText={"CheckBox"}
        style={styles.checkbox}
        checkedCheckBoxColor="#00A9FF"
      />
      <Text style={styles.label}>Unpaid debts only?</Text>
    </View>
  </View>
);

export default DebtFilterComponent;
