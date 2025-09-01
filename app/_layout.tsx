import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="StartTest" options={{ title: "Start Test" }} />
      <Tabs.Screen name="CreateTest" options={{ title: "Create Test" }} />
      <Tabs.Screen name="PastTests" options={{ title: "Past Tests" }} />
      <Tabs.Screen name="Settings" options={{ title: "Settings" }} />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
