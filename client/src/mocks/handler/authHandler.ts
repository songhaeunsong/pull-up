import { Subject } from '@/types/member';
import { http, HttpResponse } from 'msw';

const tokens = {
  accessToken: '',
  refreshToken: '',
};

export const authHandler = [
  // 로그인
  http.post('http://localhost:8080/api/v1/auth/signin', async () => {
    tokens.accessToken = 'abcd';
    tokens.refreshToken = 'abc-12323';
    if (tokens.accessToken && tokens.refreshToken) {
      return HttpResponse.json(
        {
          isSignedUp: true,
          isSolvedToday: true,
          interviewId: 1,
        },
        {
          status: 200,
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            'Set-Cookie': `refreshToken=${tokens.refreshToken}; HttpOnly`,
          },
        },
      );
    }

    return HttpResponse.json(
      {
        isSignedUp: false,
        isSolvedToday: false,
      },
      { status: 400, statusText: '[ACCESS_TOKEN] 토큰이 만료되었습니다.' },
    );
  }),

  // 토큰 재발급
  http.post('http://localhost:8080/api/v1/auth/reissue', ({ cookies }) => {
    if (!cookies.refreshToken || cookies.refreshToken !== tokens.refreshToken) {
      return HttpResponse.json({ status: 401, statusText: '[REFRESH_TOKEN] 토큰이 만료되었습니다.' });
    }

    tokens.accessToken = 'new-abcd';

    return HttpResponse.json(
      { accessToken: tokens.accessToken },
      {
        status: 200,
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
  }),

  // 로그아웃
  http.post('http://localhost:8080/api/v1/auth/logout', ({ cookies }) => {
    if (!cookies.refreshToken) {
      return HttpResponse.json({ message: 'Unathorized' }, { status: 400 });
    }

    tokens.accessToken = '';
    tokens.refreshToken = '';

    return HttpResponse.json({
      status: 200,
      headers: {
        'Set-Cookie': 'refreshToken=; HttpOnly; Max-Age=0',
      },
    });
  }),

  // 회원가입
  http.post('http://localhost:8080/api/v1/auth/signup', async ({ request }) => {
    const { subjectNames } = (await request.json()) as { subjectNames: Subject[] };

    if (subjectNames) {
      return HttpResponse.json({
        status: 200,
      });
    }

    return HttpResponse.json({ status: 400 });
  }),
];
