import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReportScreen = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  
  useEffect(() => {
    calculateTotals();
  }, []);

  const calculateTotals = async () => {
    try {
      const incomeList = await AsyncStorage.getItem("incomeList");
      const expenseList = await AsyncStorage.getItem("expenseList");

      if (incomeList && expenseList) {
        const parsedIncomeList = JSON.parse(incomeList);
        const parsedExpenseList = JSON.parse(expenseList);

        const incomeTotal = parsedIncomeList.reduce((total, item) => total + parseFloat(item.amount), 0);
        const expenseTotal = parsedExpenseList.reduce((total, item) => total + parseFloat(item.amount), 0);

        setTotalIncome(incomeTotal);
        setTotalExpense(expenseTotal);
      }
    } catch (error) {
      console.log("Error calculating totals from AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report</Text>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Income</Text>
          <Text style={styles.summaryValue}>Rs: {parseFloat(totalIncome).toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Expense</Text>
          <Text style={styles.summaryValue}>Rs: {parseFloat(totalExpense).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 16,
    color: "#555555",
  },
});

export default ReportScreen;
