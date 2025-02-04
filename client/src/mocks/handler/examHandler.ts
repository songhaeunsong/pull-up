import { http, HttpResponse } from 'msw';
import { ExamCreateRequest } from '@/types/exam';

export const examHandler = [
  // 모의고사 문제 생성
  http.post('http://localhost:8080/api/v1/exam/me', async ({ request }) => {
    const req = (await request.json()) as ExamCreateRequest;

    if (!req.subjects || !req.difficultyLevel) {
      return HttpResponse.json({ message: 'subjects와 difficultyLevel이 필요합니다.' }, { status: 400 });
    }

    const responseData = { examId: 1 };
    return HttpResponse.json(responseData, { status: 201 });
  }),

  // 모의고사 문제 조회
  http.get('http://localhost:8080/api/v1/exam/:examId', async ({ params }) => {
    const { examId } = params;
    console.log('Received examId:', examId);
    if (examId) {
      // 성공 응답
      return HttpResponse.json(
        {
          examDetailsDtos: [
            {
              problemId: 1,
              problem: 'TEST 무엇일까요?',
              options: ['데이터 압축 지원', 'https에서 s 뺀 것', '안녕', '하세요'],
              subject: 'NETWORK',
              problemType: 'MULTIPLE_CHOICE',
            },
            {
              problemId: 2,
              problem: '프로세스에 대해 설명해주세요',
              options: [],
              subject: '운영체제',
              problemType: 'SHORT_ANSWER',
            },
            {
              problemId: 7,
              problem: 'Which operating system is open-source?',
              options: ['Linux', 'Windows', 'MacOS', 'Android'],
              subject: 'OPERATING_SYSTEM',
              problemType: 'MULTIPLE_CHOICE',
            },
          ],
        },
        { status: 200 },
      );
    }
    return HttpResponse.json({ status: 404 });
  }),

  // 모의고사 채점
  http.post('http://localhost:8080/api/v1/exam/:examId', async ({ params, request }) => {
    const { examId } = params;
    const requestBody = (await request.json()) as {
      problemAndChosenAnswers: { problemId: number; chosenAnswer: string }[];
    };

    return HttpResponse.json(
      {
        message: '답안 제출 성공',
        examId,
        submittedAnswers: requestBody,
      },
      { status: 200 },
    );
  }),

  // 모의고사 채점 결과 조회
  http.get('http://localhost:8080/api/v1/exam/:examId/result', async ({ params }) => {
    const { examId } = params;
    if (examId) {
      // 성공 응답
      return HttpResponse.json(
        {
          round: '제 4회 모의고사',
          score: 40,
          examResultDetailDtos: [
            {
              problemId: 19,
              problem: 'What is the core component of an operating system?',
              options: [],
              chosenAnswer: 'Kernel',
              answer: 'Kernel',
              answerStatus: true,
              bookmarkStatus: true,
              explanation: 'explain 19',
              correctRate: 87,
              subject: 'OPERATING_SYSTEM',
              problemType: 'SHORT_ANSWER',
            },
            {
              problemId: 7,
              problem: 'Which operating system is open-source?',
              options: ['Linux', 'Windows', 'MacOS', 'Android'],
              chosenAnswer: 'Windows',
              answer: 'Linux',
              answerStatus: false,
              bookmarkStatus: false,
              explanation: 'explain...7',
              correctRate: 85,
              subject: 'OPERATING_SYSTEM',
              problemType: 'MULTIPLE_CHOICE',
            },
            {
              problemId: 15,
              problem: 'Explain the concept of virtual memory.',
              options: [],
              chosenAnswer: '몰라요~!',
              answer: 'Virtual Memory',
              answerStatus: false,
              bookmarkStatus: false,
              explanation: 'explain...15',
              correctRate: 85,
              subject: 'OPERATING_SYSTEM',
              problemType: 'SHORT_ANSWER',
            },
            {
              problemId: 12,
              problem: 'What uniquely identifies a record in a table?',
              options: ['Primary Key', 'Foreign Key', 'Unique Key', 'Index'],
              chosenAnswer: 'Index',
              answer: 'Primary Key',
              answerStatus: false,
              bookmarkStatus: false,
              explanation: 'explain...12',
              correctRate: 70,
              subject: 'DATABASE',
              problemType: 'MULTIPLE_CHOICE',
            },
            {
              problemId: 4,
              problem: 'What is the main data structure used in databases for indexing?',
              options: ['B-Tree', 'Hash Table', 'Linked List', 'Array'],
              chosenAnswer: 'B-Tree',
              answer: 'B-Tree',
              answerStatus: true,
              bookmarkStatus: false,
              explanation: 'explain...4',
              correctRate: 75,
              subject: 'DATABASE',
              problemType: 'MULTIPLE_CHOICE',
            },
          ],
        },
        { status: 200 },
      );
    }
    return HttpResponse.json({ status: 404 });
  }),

  // 최근 푼 모의고사 전체 조회
  http.get('http://localhost:8080/api/v1/exam/me/all', async ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || 1;
    const size = url.searchParams.get('size') || 10;

    const data = {
      getExamResponses: [
        {
          examId: 7,
          examName: '제 1회 모의고사',
          date: '2025-01-01T19:00:00',
          subjects: ['ALGORITHM', 'NETWORK', 'OPERATING_SYSTEM', 'DATABASE'],
        },
        {
          examId: 9,
          examName: '제 2회 모의고사',
          date: '2025-01-03T19:00:00',
          subjects: ['OPERATING_SYSTEM', 'DATABASE', 'ALGORITHM', 'NETWORK'],
        },
        {
          examId: 13,
          examName: '제 4회 모의고사',
          date: '2025-01-22T20:20:22.022201',
          subjects: ['OPERATING_SYSTEM', 'DATABASE'],
        },
        {
          examId: 12,
          examName: '제 5회 모의고사',
          date: '2025-01-24T20:20:22.022201',
          subjects: ['OPERATING_SYSTEM', 'DATABASE'],
        },
      ],
      pageable: {
        page: 0,
        size: 3,
        totalPages: 1,
        totalElements: 3,
      },
    };

    return HttpResponse.json(
      {
        content: data.getExamResponses,
        pageable: {
          page: page, // 1부터 시작하는 페이지 번호로 반환
          size,
          totalPages: data.pageable.totalPages,
          totalElements: data.pageable.totalElements,
        },
      },
      { status: 200 },
    );
  }),
];
