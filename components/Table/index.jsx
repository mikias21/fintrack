import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { Toast } from "toastify-react-native";
import ModalSelector from "react-native-modal-selector";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

// Style
import styles from "./style";

// Redux
import { deleteExpense } from "../../slices/expenseSlice";
import { reasonData } from "../../utils/constants";

// Components
import HeaderComponent from "./HeaderComponent";
import TableRowComponent from "./TableRowComponent";
import PaginationControlComponent from "./PaginationControlComponent";
import DetailsModalComponent from "./DetailsModalComponent";
import DeleteModalComponent from "./DeleteModalComponent";

const ITEMS_PER_PAGE = 5;

export default function Table({ data }) {
  const [originalPaginatedData, setOriginalPaginatedData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const user = useSelector((state) => state.user.user);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingItemID, setLoadingItemID] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
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

      <DeleteModalComponent 
        isVisible={isDeleteModalVisible} 
        toggleDeleteModal={toggleDeleteModal} 
        handleDelete={handleDelete} 
      />

      <DetailsModalComponent
        isVisible={isDetailsModalVisible}
        toggleDetailsModal={toggleDetailsModal}
        item={item}
      />

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
        renderItem={({ item, index }) => (
          <TableRowComponent
            item={item}
            index={index}
            toggleDetailsModal={toggleDetailsModal}
            toggleDeleteModal={toggleDeleteModal}
            loadingItemID={loadingItemID}
          />
        )}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={<HeaderComponent />}
      />

      <PaginationControlComponent 
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </View>
  );
}
