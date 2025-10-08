import Octicons from "@expo/vector-icons/Octicons";
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
        name="StartTest"
        options={{
          title: "Start Test",
          tabBarIcon: ({ color }) => (
            <Octicons name="play" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="CreateTest"
        options={{
          title: "Create Test",
          tabBarIcon: ({ color }) => (
            <Octicons name="pencil" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="PastTests"
        options={{
          title: "Past Tests",
          tabBarIcon: ({ color }) => (
            <Octicons name="stack" size={24} color={color} />
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
