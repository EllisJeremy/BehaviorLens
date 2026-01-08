import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FormContainer from "../components/universal/form/FormContainer";
import InputWithLabel from "../components/universal/form/InputWithLabel";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text>{"here"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});
