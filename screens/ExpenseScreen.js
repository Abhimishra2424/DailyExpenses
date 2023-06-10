import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ExpenseScreen = () => {
  const [expenseType, setExpenseType] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseList, setExpenseList] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    retrieveExpenseList();
  }, []);

  useEffect(() => {
    storeExpenseList();
  }, [expenseList]);

  const retrieveExpenseList = async () => {
    try {
      const savedExpenseList = await AsyncStorage.getItem("expenseList");
      if (savedExpenseList) {
        setExpenseList(JSON.parse(savedExpenseList));
      }
    } catch (error) {
      console.log("Error retrieving expense list from AsyncStorage:", error);
    }
  };

  const storeExpenseList = async () => {
    try {
      const jsonExpenseList = JSON.stringify(expenseList);
      await AsyncStorage.setItem("expenseList", jsonExpenseList);
    } catch (error) {
      console.log("Error storing expense list in AsyncStorage:", error);
    }
  };

  const handleAddExpense = () => {
    const newExpense = {
      id: Math.random().toString(),
      type: expenseType,
      amount: expenseAmount,
    };
    setExpenseList([...expenseList, newExpense]);
    setExpenseType("");
    setExpenseAmount("");
  };

  const handleDeleteExpense = (id) => {
    const updatedExpenseList = expenseList.filter((item) => item.id !== id);
    setExpenseList(updatedExpenseList);
    setSuccessMessage("Expense deleted successfully.");

    // Clear success message after 2 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  const renderItem = ({ item }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseType}>{item.type}</Text>
      <Text style={styles.expenseAmount}>Rs: {parseFloat(item.amount).toFixed(2)}</Text>
      <TouchableOpacity onPress={() => handleDeleteExpense(item.id)}>
        <MaterialIcons name="delete" style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <MaterialIcons name="category" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Expense Type"
          value={expenseType}
          onChangeText={(text) => setExpenseType(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="attach-money" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Expense Amount"
          value={expenseAmount}
          onChangeText={(text) => setExpenseAmount(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Add Expense" onPress={handleAddExpense} />
      </View>
      {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
      <FlatList
        data={expenseList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.expenseList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    elevation: 2,
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
    color: "#999999",
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  successMessage: {
    color: "green",
    marginBottom: 16,
    textAlign: "center",
  },
  incomeList: {
    flexGrow: 1,
  },
  incomeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  incomeType: {
    fontSize: 16,
    fontWeight: "bold",
  },
  incomeAmount: {
    fontSize: 16,
    color: "#555555",
  },
  deleteIcon: {
    fontSize: 24,
    color: "#ff0000",
  },
});

export default ExpenseScreen;
