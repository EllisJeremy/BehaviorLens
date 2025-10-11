import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function CreateTest() {
  const [step, setStep] = useState(1);

  // dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("math");
  const [items, setItems] = useState([
    { label: "Math", value: "math" },
    { label: "Reading", value: "reading" },
    { label: "Science", value: "science" },
  ]);

  // form data
  const [testName, setTestName] = useState("");

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.title}>Step 1: Choose Category</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select a category"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.title}>Step 2: Enter Test Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Test name"
            value={testName}
            onChangeText={setTestName}
          />
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.title}>Step 3: Review</Text>
          <Text>Category: {value}</Text>
          <Text>Name: {testName}</Text>
        </>
      )}

      <View style={styles.nav}>
        {step > 1 && (
          <Button title="Prev" onPress={() => setStep((s) => s - 1)} />
        )}
        {step < 3 ? (
          <Button title="Next" onPress={() => setStep((s) => s + 1)} />
        ) : (
          <Button title="Submit" onPress={() => alert("Submitted!")} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  dropdown: {
    borderColor: "#ccc",
  },
  dropdownContainer: {
    borderColor: "#ccc",
  },
  nav: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
