import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveObject = async (objectKey: string, object: any) => {
  try {
    await AsyncStorage.setItem(objectKey, JSON.stringify(object));
  } catch (e) {
    console.error("Error saving", objectKey, e);
  }
};

export const loadObject = async (objectKey: string) => {
  try {
    const stored = await AsyncStorage.getItem(objectKey);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error("Error loading", objectKey, e);
  }
};
