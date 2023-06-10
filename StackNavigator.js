import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import IncomeScreen from "./screens/IncomeScreen";
import ExpenseScreen from "./screens/ExpenseScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons";
import ReportScreen from "./screens/ReportScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function Home() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "blue",
        }}
      >
        <Tab.Screen
          name="Income"
          component={IncomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="attach-money"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Expense"
          component={ExpenseScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="money-off"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Report"
          component={ReportScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="book"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
