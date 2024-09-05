import { useState, useEffect } from "react";
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
import ModalSelector from "react-native-modal-selector";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

// Icons
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Style
import styles from "./style";

// Redux
import { deleteExpense } from "../../slices/expenseSlice";

import { formatDateForTable } from "../../utils/utils";

import { reasonData } from "../../utils/constants";

const ITEMS_PER_PAGE = 5;

export default function Table({ data }) {
  const [originalPaginatedData, setOriginalPaginatedData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const user = useSelector((state) => state.user.user);
  const [currentPage, setCurrentPage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingItemID, setLoadingItemID] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [currentRowBgColor, setCurrentRowBgColor] = useState("");
  const [dataId, setDataId] = useState("");
  const [item, setItem] = useState(null);
  const dispatch = useDispatch();
  // Filters
  const [show, setShow] = useState(false);
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [expenseDateReal, setExpenseDateReal] = useState("");
  const [mode, setMode] = useState("date");

  useEffect(() => {
    if (data && data.length > 0) {
      const paginated = data
        .slice()
        .reverse()
        .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);
      
      setOriginalPaginatedData(paginated);
      setPaginatedData(paginated);
    }
  }, [data, currentPage]);

  // Date picker functions
  const handleDatePickedAndFilter = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setExpenseDate(currentDate);
    
    const formattedDate = dayjs(currentDate).format("YYYY-MM-DD");
    setExpenseDateReal(formattedDate);

    const filteredData = originalPaginatedData.filter(
      (item) => dayjs(item.expense_date).format("YYYY-MM-DD") === formattedDate
    );

    setPaginatedData(filteredData);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

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

  const getItemLayout = (index) => {
    const nextBgColor = index % 2 === 0 ? "#FFFFFF" : "#F0F8FF";
    return nextBgColor;
  };

  const renderItem = ({ item, index }) => {
    const truncatedReason =
      item.expense_reason.length > 6
        ? `${item.expense_reason.slice(0, 6)}...`
        : item.expense_reason;
    
    const truncatedAmount = item.expense_amount.length > 5 ?
      `${item.expense_amount.slice(0, 6)}...`
        : item.expense_amount;

    return (
      <View
        style={[styles.rowContainer, { backgroundColor: getItemLayout(index) }]}
      >
        <Text style={[styles.rowText, { flex: 2 }]}>
          {formatDateForTable(item.expense_date)}
        </Text>
        <Text style={[styles.rowText, { flex: 1, fontSize: 12, marginLeft: 10 }]}>
          {truncatedAmount}..&#165;
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
            {loadingItemID === item._id ? (
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

  const handleDelete = () => {
    setIsDeleteModalVisible(false);
    setDataId("");
    setIsLoading(true);
    setLoadingItemID(dataId);

    const deleteDetails = { expenseID: dataId, token: user.token };
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

  // Filter functions
  const filterTableDataByReason = (reason) => {
    if (!reason) {
      setPaginatedData(originalPaginatedData);
    } else {
      const filteredData = originalPaginatedData.filter(
        (item) => item.expense_reason === reason
      );
      setPaginatedData(filteredData);
    }
  }

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

      {/* Filters */}
      <View style={styles.filter_container}>
        <TouchableOpacity style={styles.filter_item} onPress={showDatepicker}>
          <Text style={styles.filter_text}>Date
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={expenseDate}
                mode={mode}
                onChange={handleDatePickedAndFilter}
              />
            )}
          </Text>
        </TouchableOpacity>
        {/* Select reason modal */}
      <ModalSelector
          data={reasonData}
          initValue="Reason"
          onChange={(option) => filterTableDataByReason(option.label)}
          initValueTextStyle={{ color: "#000" }}
          selectTextStyle={{ endFillColor: "#000" }}
        >
          <TouchableOpacity style={styles.filter_item}>
            <Text style={styles.filter_text}>Reason</Text>
          </TouchableOpacity>
        </ModalSelector>
        <TouchableOpacity style={styles.filter_item} onPress={() => setPaginatedData(originalPaginatedData)}>
            <Text style={styles.filter_text}>All</Text>
        </TouchableOpacity>
      </View>

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
