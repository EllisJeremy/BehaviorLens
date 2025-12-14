import React, { useEffect } from "react";
import { FlatList, StyleSheet, View, Pressable, Text } from "react-native";
import StudentTile from "../components/students/StudentTile";
import AddStudentModal from "../components/students/AddStudentModal";
import Octicons from "@expo/vector-icons/Octicons";
import { useObservationModalStore } from "../state/observations/useObservationsModalStore";

export default function Observations() {
  const { loadStudents, students } = useObservationStore();
  const { setOpen } = useObservationModalStore();

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <View style={styles.container}>
      {Object.keys(students).length > 0 ? (
        <FlatList
          data={Object.values(students)}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <StudentTile
              uuid={item.uuid}
              firstName={item.firstName}
              lastName={item.lastName}
              grade={item.grade}
            />
          )}
          ListHeaderComponent={() => (
            <View style={{ height: 1, backgroundColor: "#d6d6d6" }} />
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "#d6d6d6" }} />
          )}
          ListFooterComponent={() => (
            <View style={{ height: 1, backgroundColor: "#d6d6d6" }} />
          )}
        />
      ) : (
        <View style={styles.placeHolder}>
          <Text>Press + to add Students</Text>
        </View>
      )}

      <PlusButton onPress={() => setOpen(true)} />

      <AddStudentModal />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  placeHolder: {
    margin: "auto",
  },
  add: {
    backgroundColor: "rgba(12, 185, 0, 1)",
    width: 90,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    margin: 20,
  },
});
