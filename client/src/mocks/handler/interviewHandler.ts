import { http, HttpResponse } from 'msw';

export const interviewHandler = [
  http.get('http://localhost:8080/api/v1/interview', async () => {
    const isError = false;

    if (!isError) {
      return HttpResponse.json(
        {
          interviewId: 1,
          question: 'Checked Exception과 Unchecked Exception의 차이는 ?',
          keywords: ['Java', 'Exception'],
        },
        {
          status: 200,
        },
      );
    }

    return HttpResponse.json({ status: 404 });
  }),
];
