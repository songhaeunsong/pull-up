import ky from 'ky';

const instance = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

const api = instance.extend({
  hooks: {
    beforeRequest: [() => {}], // accessToken 넣기
    afterResponse: [
      (_request, _optionsresponse, response) => {
        if (response.ok) return response.json();
        throw new Error('Response is not OK');
      },
      (_request, _options, response) => {
        if (response.status == 403) {
          console.log('reissue');
        }
      },
    ],
  },
});

export default api;
