import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getAccessToken(): Promise<string | null> {
  return AsyncStorage.getItem("accessToken");
}
