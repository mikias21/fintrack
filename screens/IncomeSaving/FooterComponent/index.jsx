import React from "react";
import { View, Text, FlatList } from "react-native";

import DeductionActvityCard from "../../../components/DeductionActivityCard";
import styles from "../styles";

const FooterComponent = ({ latestDeductions }) => {
  return (
    <>
      {latestDeductions.length > 0 ? (
        <View style={styles.final_list}>
          <Text style={[styles.text_two, { marginTop: 10 }]}>
            Recent Saving Expenses
          </Text>
          <FlatList
            data={latestDeductions}
            renderItem={({ item }) => (
              <DeductionActvityCard activity={item} />
            )}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={{ marginBottom: 20 }}></View>
      )}
    </>
  );
};

export default FooterComponent;
