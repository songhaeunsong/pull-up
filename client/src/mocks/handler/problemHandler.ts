import { http, HttpResponse } from 'msw';

export const problemHandler = [
  http.get('http://localhost:8080/api/v1/problem/me/all', async () => {
    return HttpResponse.json(
      {
        wrongProblemDtos: [
          {
            problemId: 2,
            question: 'What is the most abundant element in air?',
            subject: 'NETWORK',
            date: '2025-01-21T19:05:00',
          },
          {
            problemId: 5,
            question: 'What is 2 to the power of 1?',
            subject: 'ALGORITHM',
            date: '2025-01-21T19:20:00',
          },
          {
            problemId: 21,
            question: 'Explain the concept of virtual memory.',
            subject: 'OPERATING_SYSTEM',
            date: '2025-01-21T21:00:00',
          },
          {
            problemId: 20,
            question: 'What is the purpose of normalization in databases?',
            subject: 'DATABASE',
            date: '2025-01-21T21:25:00',
          },
          {
            problemId: 7,
            question: 'Which operating system is open-source?',
            subject: 'OPERATING_SYSTEM',
            date: '2025-01-22T20:20:22.062311',
          },
          {
            problemId: 15,
            question: 'Explain the concept of virtual memory.',
            subject: 'OPERATING_SYSTEM',
            date: '2025-01-22T20:20:22.06482',
          },
          {
            problemId: 12,
            question: 'What uniquely identifies a record in a table?',
            subject: 'DATABASE',
            date: '2025-01-22T20:20:22.067247',
          },
        ],
      },
      { status: 200 },
    );
  }),
];
