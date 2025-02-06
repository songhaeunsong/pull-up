import { http, HttpResponse } from 'msw';

const bookmarkStatusMap = new Map<string, boolean>();

export const problemHandler = [
  http.get('http://localhost:8080/api/v1/problem/me/all', async () => {
    return HttpResponse.json(
      {
        wrongProblemDtos: [
          {
            problemId: 6,
            question: '스택의 주요 특징은 무엇입니까?',
            subject: '자료구조',
            date: '2025-01-21T21:00:00',
          },
          {
            problemId: 20,
            question: '데이터베이스에서 정규화의 목적은 무엇인가요?',
            subject: '데이터베이스',
            date: '2025-01-21T21:25:00',
          },
          {
            problemId: 7,
            question: '어떤 운영체제가 오픈소스인가요?',
            subject: '운영체제',
            date: '2025-01-22T20:20:22.062311',
          },
          {
            problemId: 15,
            question: '가상 메모리의 개념을 설명하세요.',
            subject: '운영체제',
            date: '2025-01-22T20:20:22.06482',
          },
          {
            problemId: 12,
            question: '테이블에서 레코드를 고유하게 식별하는 것은 무엇인가요?',
            subject: '데이터베이스',
            date: '2025-01-22T20:20:22.067247',
          },
        ],
      },
      { status: 200 },
    );
  }),

  http.get('http://localhost:8080/api/v1/problem/archive/all', async () => {
    return HttpResponse.json({
      bookmarkedProblemDtos: [
        {
          problemId: 6,
          question: '스택의 주요 특징은 무엇입니까?',
          subject: '자료구조',
          date: '2025-01-23T10:54:51.615038',
        },
        {
          problemId: 12,
          question: '데이터베이스에서 정규화의 주요 목적은 무엇입니까?',
          subject: '데이터베이스',
          date: '2025-01-22T20:20:22.067247',
        },
      ],
    });
  }),

  http.get('http://localhost:8080/api/v1/problem/:problemId', async ({ params }) => {
    const { problemId } = params;
    if (problemId) {
      return HttpResponse.json(
        {
          question: '스택의 주요 특징은 무엇입니까?',
          options: ['FIFO', 'LIFO', '랜덤 접근', '순차 접근'],
          answer: 'LIFO',
          explanation:
            '스택(Stack)은 마지막에 삽입된 데이터가 가장 먼저 제거되는 LIFO(Last In First Out) 방식의 자료구조입니다.',
          correctRate: 70,
          subject: '자료구조',
        },
        { status: 200 },
      );
    }

    return HttpResponse.json({ status: 404 });
  }),

  http.post('http://localhost:8080/api/v1/problem/:problemId', async ({ params }) => {
    const { problemId } = params;

    const currentStatus = bookmarkStatusMap.get(String(problemId)) || false;
    const updatedStatus = !currentStatus;
    bookmarkStatusMap.set(String(problemId), updatedStatus);

    if (problemId) {
      return HttpResponse.json(
        {
          isBookmarked: updatedStatus,
        },
        { status: 200 },
      );
    }

    return HttpResponse.json({ message: '문제를 찾을 수 없습니다' }, { status: 404 });
  }),
];
