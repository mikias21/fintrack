import React from "react";
import { FlatList } from "react-native";
import ActivityCard from "../../../components/ActivityCard";

import styles from "../styles";

const ActivityComponent = ({ sortedIncomes }) => {
  return (
    <FlatList
      data={sortedIncomes}
      renderItem={({ item }) => <ActivityCard activity={item} />}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.list_two}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ActivityComponent;
