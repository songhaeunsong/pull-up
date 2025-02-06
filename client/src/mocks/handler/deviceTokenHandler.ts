import { http, HttpResponse } from 'msw';

export const deviceTokenHandler = [
  http.post('http://localhost:8080/api/v1/auth/deviceToken', async ({ request }) => {
    const { token } = (await request.json()) as { token: string };

    if (token) {
      return HttpResponse.json({
        status: 200,
      });
    }

    return HttpResponse.json({ status: 400 });
  }),
];
