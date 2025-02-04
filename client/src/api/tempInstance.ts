import ky from 'ky';

const instance = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
  retry: 1,
});

const tempApi = instance.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('Authorization', `Bearer ${import.meta.env.VITE_TEMP_ID_1}`);
      },
    ],
    afterResponse: [
      // async (_request, _options, response) => {
      //   await handleToken(_request, response);
      // },
      (_request, _options, response) => {
        if (response.ok) return response;
        throw new Error('Response is not OK');
      },
    ],
  },
});

export default tempApi;
