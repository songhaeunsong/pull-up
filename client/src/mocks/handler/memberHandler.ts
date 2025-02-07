import { http, HttpResponse } from 'msw';

export const memberHandler = [
  http.get('http://localhost:8080/api/v1/member/me', () => {
    const isError = false;

    if (!isError) {
      return HttpResponse.json(
        {
          name: '이싸피',
          email: 'ssafy@ssafy.com',
          profileImageUrl:
            'https://lh3.googleusercontent.com/a/ACg8ocLdOrn_oTb46ocN1PsRP_-bj1ISDi-05HDKuopwChRmIgVCnQ=s96-c',
          interestSubjects: ['ALGORITHM', 'DATA_STRUCTURE', 'NETWORK'],
        },
        {
          status: 200,
        },
      );
    }

    return HttpResponse.json({ status: 404 });
  }),

  http.post('http://localhost:8080/api/v1/member/device-token', async ({ request }) => {
    const { token } = (await request.json()) as { token: string };

    if (token) {
      return HttpResponse.json(
        {
          deviceTokenId: 1,
        },
        {
          status: 200,
        },
      );
    }

    return HttpResponse.json({ status: 400 });
  }),
];
