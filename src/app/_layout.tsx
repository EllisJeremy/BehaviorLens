import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { themeColors } from "../utils/styles";
import { useSettingsStore } from "../state/settings/useSettingsStore";
import { useEffect } from "react";
import { useStudentsStore } from "../state/students/useStudentsStore";

import { Tabs } from "expo-router";

export default function RootLayout() {
  const { settings, loadSettings } = useSettingsStore();
  const { loadStudents } = useStudentsStore();
  useEffect(() => {
    loadSettings();
    loadStudents();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: settings.themeColor,
        tabBarStyle: {
          paddingTop: 5,
          height: 85,
        },
      }}
    >
      <Tabs.Screen
        name="Observations"
        options={{
          title: "Observations",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clipboard-edit"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Students"
        options={{
          title: "Students",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="graduation-cap" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Reports"
        options={{
          title: "Reports",
          tabBarIcon: ({ color }) => (
            <Entypo name="bar-graph" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="gear" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
