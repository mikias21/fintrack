import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import ToastManager, { Toast } from "toastify-react-native";

// Icons
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Style
import styles from "./style";

// Redux
import { deleteExpense } from "../../slices/expenseSlice";

const ITEMS_PER_PAGE = 7;

export default function Table({ data }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [dataId, setDataId] = useState("");
  const dispatch = useDispatch();

  const showSuccessDeleteToast = () => {
    Toast.success("Successfully deleted!");
  };

  const showErrorDeleteToast = () => {
    Toast.error("There was a problem trying to delete!");
  };

  const toggleDeleteModal = (id) => {
    if (id !== "") setDataId(id);
    setIsDeleteModalVisible(!isDeleteModalVisible);
  };

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
      <Text style={styles.headerText}></Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.rowContainer}>
      <Text style={styles.rowText}>{item.expense_date}</Text>
      <Text style={styles.rowText}>{item.expense_amount}</Text>
      <Text style={styles.rowText}>{item.expense_reason}</Text>
      <View style={styles.container_three}>
        <TouchableOpacity>
          {showDetails ? (
            <MaterialIcons name="details" size={18} color="#00A9FF" />
          ) : (
            <MaterialCommunityIcons name="details" size={18} color="#00A9FF" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleDeleteModal(item._id)}>
          {isLoading ? (
            <ActivityIndicator
              size={15}
              color="#FC819E"
              style={{ marginLeft: 15 }}
            />
          ) : (
            <AntDesign
              name="delete"
              size={15}
              color="#FC819E"
              style={{ marginLeft: 15 }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const paginatedData = data
    .slice()
    .reverse()
    .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  const handleDelete = () => {
    setIsDeleteModalVisible(false);
    setDataId("");
    setIsLoading(true);

    dispatch(deleteExpense(dataId))
      .unwrap()
      .then((res) => {
        showSuccessDeleteToast();
      })
      .catch((err) => {
        showErrorDeleteToast();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.tableContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => toggleDeleteModal("")}
      >
        <View style={styles.modalContainer}>
          <ToastManager />
          <View style={styles.modalContent}>
            <Text>Are you sure you want to delete ?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={handleDelete}>
                <AntDesign name="delete" size={24} color="#FC819E" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => toggleDeleteModal("")}>
                <AntDesign
                  name="close"
                  size={24}
                  color="#afaeae"
                  style={{ marginLeft: 50 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
