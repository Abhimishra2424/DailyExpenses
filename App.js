import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./StackNavigator";
// import { AppProvider } from './context/appContext';

export default function App() {
  return (
    <>
      <StackNavigator />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({});
