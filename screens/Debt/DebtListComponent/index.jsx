import { FlatList, View } from 'react-native';
import DebtActivityCard from "../../../components/DebtActivityCard";
import styles from "../styles";

const DebtListComponent = ({ filteredData }) => (
  <View style={styles.list_two}>
    <FlatList
      data={filteredData}
      renderItem={({ item }) => <DebtActivityCard activity={item} />}
      keyExtractor={(item) => item._id}
    />
  </View>
);

export default DebtListComponent;
