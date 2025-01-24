import { http, HttpResponse } from 'msw';

export const examHandler = [
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
              subject: '네트워크',
              problemType: 'SHORT_ANSWER',
            },
            {
              problemId: 2,
              problem: '프로세스에 대해 설명해주세요',
              options: [],
              subject: '운영체제',
              problemType: 'MULTIPLE_CHOICE',
            },
          ],
        },
        { status: 200 },
      );
    }
    return HttpResponse.json({ status: 404 });
  }),

  // 모의고사 채점 결과 조회
  http.get('http://localhost:8080/api/v1/exam/:examId/result', async ({ params }) => {
    const { examId } = params;
    console.log('Received examId:', examId);
    if (examId) {
      // 성공 응답
      return HttpResponse.json(
        {
          examResults: [
            {
              problemId: 19,
              problem: 'What is the core component of an operating system?',
              options: [],
              chosenAnswer: 'Kernel',
              answer: 'Kernel',
              answerStatus: true,
              bookmarkStatus: false,
              explanation: 'Explanation Data~',
              correctRate: 87,
              round: '제 4회 모의고사',
              subject: 'OPERATING_SYSTEM',
              problemType: 'SHORT_ANSWER',
            },
            {
              problemId: 7,
              problem: 'Which operating system is open-source?',
              options: ['Linux', 'Windows', 'MacOS', 'Android'],
              chosenAnswer: 'a',
              answer: 'Linux',
              answerStatus: false,
              bookmarkStatus: false,
              explanation: 'Explanation Data...!',
              correctRate: 85,
              round: '제 4회 모의고사',
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
];
