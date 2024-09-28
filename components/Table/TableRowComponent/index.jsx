import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import { formatDateForTable } from "../../../utils/utils";

import styles from "./style";

export default TableRowComponent = ({ item, index, toggleDetailsModal, toggleDeleteModal, loadingItemID }) => {

    const truncatedReason =
      item.expense_reason.length > 6
        ? `${item.expense_reason.slice(0, 6)}...`
        : item.expense_reason;
    
    const getItemLayout = (index) => {
      const nextBgColor = index % 2 === 0 ? "#FFFFFF" : "#F0F8FF";
      return nextBgColor;
    };
  
    const formatNumber = (value) => {
      if (value === 0) return '0';
      if (value >= 1_000_000) return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
      if (value >= 1_000) return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
      return value.toString();
    };
    
    const formattedAmount = formatNumber(item.expense_amount);

    return(
    <View style={[styles.rowContainer, { backgroundColor: getItemLayout(index) }]}>
        <Text style={[styles.rowText, { flex: 2 }]}>
          {formatDateForTable(item.expense_date)}
        </Text>
        <Text style={[styles.rowText, { flex: 1, fontSize: 12, marginLeft: 10 }]}>
          {formattedAmount}&#165;
        </Text>
        <Text style={[styles.rowText, { flex: 3, fontSize: 12 }]}>
          {truncatedReason}
        </Text>
        <View style={styles.container_three}>
          <TouchableOpacity onPress={() => toggleDetailsModal(item)}>
            <MaterialCommunityIcons name="details" size={18} color="#00A9FF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleDeleteModal(item._id)}>
            {loadingItemID === item._id ? (
              <ActivityIndicator size={15} color="#FC819E" style={{ marginLeft: 15 }} />
            ) : (
              <AntDesign name="delete" size={15} color="#FC819E" style={{ marginLeft: 15 }} />
            )}
          </TouchableOpacity>
        </View>
    </View>
    );
}