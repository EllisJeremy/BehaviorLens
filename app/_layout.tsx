import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="StartTest" />
      <Tabs.Screen name="CreateTest" />
      <Tabs.Screen name="PastTests" />
      <Tabs.Screen name="Settings" />
    </Tabs>
  );
}
