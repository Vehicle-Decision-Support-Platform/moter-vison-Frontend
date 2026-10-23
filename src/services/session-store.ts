import * as SecureStore from 'expo-secure-store';

const refreshTokenKey = 'motor-vision.refresh-token';

export const sessionStore = {
  readRefreshToken: () => SecureStore.getItemAsync(refreshTokenKey),
  saveRefreshToken: (token: string) => SecureStore.setItemAsync(refreshTokenKey, token, { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY }),
  clear: () => SecureStore.deleteItemAsync(refreshTokenKey),
};
