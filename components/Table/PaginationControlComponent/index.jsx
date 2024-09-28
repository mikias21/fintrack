import { View, Pressable, Text } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import styles from "./style";

export default PaginationControlComponent = ({ currentPage, totalPages, handleNextPage, handlePrevPage }) => {
    return(
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
        <Text style={styles.paginationText}>
          {currentPage + 1} of {totalPages}
        </Text>
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
    );
}