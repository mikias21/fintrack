import React from "react";
import { View, Text, Image, FlatList } from "react-native";

import DashboardCard from "../../../components/DashboardCard";
import DeductSavingsForm from "../../../components/DeductSavingsForm";
import SavingActivityCard from "../../../components/SavingsActivityCard";

import styles from "../styles";

const HeaderComponent = ({ totalAmountOfIncome, totalAmountOfSaving, savings }) => {
  return (
    <>
      <View style={styles.container_main_one}>
        <View style={styles.container_one}>
          <Image
            source={require("../../../assets/income.png")}
            style={styles.header_image}
          />
          <Text style={styles.text_one}>Incomes &amp; Savings</Text>
        </View>
      </View>

      <View style={styles.container_two_main}>
        <View style={styles.container_two}>
          <DashboardCard
            intro_text="Income as of"
            amount={totalAmountOfIncome}
            image={require("../../../assets/income.png")}
            color="#4CCD99"
          />
        </View>
        <View style={styles.container_two}>
          <DashboardCard
            intro_text="Savings as of"
            amount={totalAmountOfSaving}
            image={require("../../../assets/piggy-bank.png")}
            color="#00A9FF"
          />
        </View>
      </View>

      <View>
        <DeductSavingsForm />
      </View>

      <Text style={styles.text_two_one}>Recent Savings</Text>
      <FlatList
        data={savings}
        renderItem={({ item }) => <SavingActivityCard activity={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list_two}
        showsVerticalScrollIndicator={false}
      />
      <Text style={styles.text_two}>Recent Incomes</Text>
    </>
  );
};

export default HeaderComponent;
