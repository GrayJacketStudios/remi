import * as SecureStore from 'expo-secure-store';

const KEY_INSTANCE = 'fediverse_instance';
const KEY_TOKEN = 'fediverse_token';

export const saveSessionToSecureStore = async (instance: string, token: string) => {
  await SecureStore.setItemAsync(KEY_INSTANCE, instance);
  await SecureStore.setItemAsync(KEY_TOKEN, token);
};

export const clearSecureSession = async () => {
  await SecureStore.deleteItemAsync(KEY_INSTANCE);
  await SecureStore.deleteItemAsync(KEY_TOKEN);
};

export const loadSessionFromSecureStore = async () => {
  const instance = await SecureStore.getItemAsync(KEY_INSTANCE);
  const token = await SecureStore.getItemAsync(KEY_TOKEN);
  if (instance && token) {
    return { instance, token };
  }
  return null;
};