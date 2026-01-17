import React, { useEffect } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import StudentTile from "../components/students/StudentTile";
import AddStudentModal from "../components/students/AddStudentModal";
import { useStudentsModalStore } from "../state/students/useStudentsModalStore";
import { useStudentsStore } from "../state/students/useStudentsStore";
import PlusButton from "../components/universal/PlusButton";
import { colors } from "../utils/styles";

export default function Students() {
  const { loadStudents, students } = useStudentsStore();
  const { setOpen } = useStudentsModalStore();

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
          ListHeaderComponent={() => <View style={styles.line} />}
          ItemSeparatorComponent={() => <View style={styles.line} />}
          ListFooterComponent={() => <View style={styles.line} />}
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
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  placeHolder: {
    margin: "auto",
  },
  line: { height: 1, backgroundColor: colors.lighterGray },
});
