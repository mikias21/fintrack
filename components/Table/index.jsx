import { useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Style
import styles from "./style";

const ITEMS_PER_PAGE = 7;

export default function Table({ data }) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages =
    Math.ceil(data.length / ITEMS_PER_PAGE) <= 1
      ? 1
      : Math.ceil(data.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Date</Text>
      <Text style={styles.headerText}>Amount</Text>
      <Text style={styles.headerText}>Reason</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.rowContainer}>
      <Text style={styles.rowText}>{item.expense_date}</Text>
      <Text style={styles.rowText}>{item.expense_amount}</Text>
      <Text style={styles.rowText}>{item.expense_reason}</Text>
    </View>
  );

  const paginatedData = data
    .slice()
    .reverse()
    .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  console.log(data);

  return (
    <View style={styles.tableContainer}>
      <Text style={styles.text_one}>Expense Table</Text>

      <FlatList
        data={paginatedData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={renderHeader}
      />

      <View style={styles.paginationContainer}>
        <Pressable onPress={handlePrevPage} disabled={currentPage === 0}>
          <Text
            style={[
              styles.paginationText,
              currentPage === 0 && styles.disabledText,
            ]}
          >
            <AntDesign name="arrowleft" size={24} />
          </Text>
        </Pressable>
        {/* <Text style={styles.paginationText}>
          {currentPage + 1} of {totalPages}
        </Text> */}
        <Pressable
          onPress={handleNextPage}
          disabled={currentPage >= totalPages - 1}
        >
          <Text
            style={[
              styles.paginationText,
              currentPage >= totalPages - 1 && styles.disabledText,
            ]}
          >
            <AntDesign name="arrowright" size={24} />
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
