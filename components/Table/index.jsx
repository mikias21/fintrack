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
import { useSelector } from "react-redux";

// Icons
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Style
import styles from "./style";

// Redux
import { deleteExpense } from "../../slices/expenseSlice";

import { formatDateForTable } from "../../utils/utils";

const ITEMS_PER_PAGE = 5;

export default function Table({ data }) {
  const user = useSelector((state) => state.user.user);
  const [currentPage, setCurrentPage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [dataId, setDataId] = useState("");
  const [item, setItem] = useState(null);
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

  const toggleDetailsModal = (item) => {
    if (item !== null) setItem(item);
    setIsDetailsModalVisible(!isDetailsModalVisible);
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

  const renderItem = ({ item, index }) => {
    const truncatedReason =
      item.expense_reason.length > 6
        ? `${item.expense_reason.slice(0, 6)}...`
        : item.expense_reason;

    const nextBgColor = index % 2 === 0 ? "'#FFFFFF'" : "#F0F8FF";

    return (
      <View style={[styles.rowContainer, { backgroundColor: nextBgColor }]}>
        <Text style={[styles.rowText, { flex: 2 }]}>
          {formatDateForTable(item.expense_date)}
        </Text>
        <Text style={[styles.rowText, { flex: 1, fontSize: 12 }]}>
          {item.expense_amount.toFixed(2)}
        </Text>
        <Text style={[styles.rowText, { flex: 3, fontSize: 12 }]}>
          {truncatedReason}
        </Text>
        <View style={styles.container_three}>
          <TouchableOpacity onPress={() => toggleDetailsModal(item)}>
            {showDetails ? (
              <MaterialIcons name="details" size={18} color="#00A9FF" />
            ) : (
              <MaterialCommunityIcons
                name="details"
                size={18}
                color="#00A9FF"
              />
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
  };

  const paginatedData = data
    .slice()
    .reverse()
    .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  const handleDelete = () => {
    setIsDeleteModalVisible(false);
    setDataId("");
    setIsLoading(true);

    const deleteDetails = { expenseID: dataId, userID: user._id };
    dispatch(deleteExpense(deleteDetails))
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
      {/* Delete modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => toggleDeleteModal("")}
      >
        <View style={styles.modalContainer}>
          <ToastManager />
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>
              Are you sure you want to delete?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => toggleDeleteModal("")}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* View details modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDetailsModalVisible}
        onRequestClose={() => toggleDetailsModal("")}
      >
        <View style={styles.detailsModalContainer}>
          <ToastManager />
          <View style={styles.detailsModalContent}>
            <Text style={styles.detailsModalHeader}>Expense Details</Text>
            <View style={styles.detailsModalDetailsContainer}>
              <View style={styles.detailsModalExpenseLabel}>
                <Text style={styles.detailsModalExpenseLabelText}>
                  Expense Date:
                </Text>
                <Text style={styles.detailsModalExpenseLabelValue}>
                  {item?.expense_date}
                </Text>
              </View>
              <View style={styles.detailsModalExpenseLabel}>
                <Text style={styles.detailsModalExpenseLabelText}>
                  Expense Reason:
                </Text>
                <Text style={styles.detailsModalExpenseLabelValue}>
                  {item?.expense_reason}
                </Text>
              </View>
              <View style={styles.detailsModalExpenseLabel}>
                <Text style={styles.detailsModalExpenseLabelText}>
                  Expense Amount:
                </Text>
                <Text style={styles.detailsModalExpenseLabelValue}>
                  {item?.expense_amount}
                </Text>
              </View>
              <View style={styles.detailsModalExpenseLabel}>
                <Text style={styles.detailsModalExpenseLabelText}>
                  Comment:
                </Text>
                <Text style={styles.detailsModalExpenseLabelValue}>
                  {item?.expense_comment}
                </Text>
              </View>
            </View>
            <View style={styles.detailsModalButtonContainer}>
              <TouchableOpacity
                onPress={() => toggleDetailsModal(null)}
                style={styles.detailsCloseButton}
              >
                <Text style={styles.detailsModalButtonText}>Close</Text>
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
    </View>
  );
}
