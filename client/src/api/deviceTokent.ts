import api from './instance';

// 디바이스 토큰 등록
export const registerDeviceToken = async (token: string) => {
  await api.post('auth/deviceToken', { json: { token: token } });
};
