import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet } from "react-native";
import CardContainer from "./src/module/home/CardContainer";

const styles = StyleSheet.create({
  app: {
    backgroundColor: "#F6F6F6",
    height: "100%",
  },
});

export default function App() {
  return (
    <View style={styles.app}>
      <CardContainer />
      <StatusBar style="auto" />
    </View>
  );
}
