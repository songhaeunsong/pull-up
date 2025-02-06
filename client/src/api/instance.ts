import ky from 'ky';
import { addAuthHeader, handleToken } from '@/utils/authService';

const instance = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
  retry: 1,
});

const api = instance.extend({
  hooks: {
    beforeRequest: [addAuthHeader],
    afterResponse: [handleToken],
  },
});

export default api;
