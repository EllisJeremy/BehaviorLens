import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "hsl(208, 100%, 60%)",
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
            <Octicons name="stopwatch" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Students"
        options={{
          title: "Students",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-graduate" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Reports"
        options={{
          title: "Reports",
          tabBarIcon: ({ color }) => (
            <Ionicons name="documents-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Octicons name="gear" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
