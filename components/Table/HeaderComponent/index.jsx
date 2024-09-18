import { View, Text } from "react-native";

import styles from "./style"

export default HeaderComponent = () => {
    return(
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Date</Text>
            <Text style={styles.headerText}>Amount</Text>
            <Text style={styles.headerText}>Reason</Text>
            <Text style={styles.headerText}></Text>
        </View>
    );
}