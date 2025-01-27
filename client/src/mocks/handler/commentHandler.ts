import { CommentRequest } from '@/types/interview';
import { http, HttpResponse } from 'msw';

// 댓글 작성
export const commentHandler = [
  http.post(
    'http://localhost:8080/api/v1/interview/:interviewId/:interviewAnswerId/comment',
    async ({ params, request }) => {
      const { interviewId, intvewrAnswerId } = params;
      const { comment } = (await request.json()) as { comment: CommentRequest };

      if (interviewId && intvewrAnswerId && comment) {
        return HttpResponse.json(
          {
            interviewAnswerId: '1',
            comment: '면접에 도움이 되었어요. 감사합니다',
          },
          {
            status: 201,
          },
        );
      }

      return HttpResponse.json({
        status: 404,
      });
    },
  ),

  // 댓글 수정
  http.patch(
    'http://localhost:8080/api/v1/interview/:interviewId/:interviewAnswerId/comment/:commentId',
    async ({ params, request }) => {
      const { interviewId, interviewAnswerId, commentId } = params;
      const { comment } = (await request.json()) as { comment: string };

      if (interviewId && interviewAnswerId && commentId && comment) {
        return HttpResponse.json(
          {
            comment: '수정 테스트입니다',
          },
          {
            status: 200,
          },
        );
      }

      return HttpResponse.json({
        status: 404,
      });
    },
  ),

  // 댓글 삭제
  http.delete(
    'http://localhost:8080/api/v1/interview/:interviewId/:interviewAnswerId/comment/:commentId',
    async ({ params }) => {
      const { interviewId, interviewAnswerId } = params;

      if (interviewId && interviewAnswerId) {
        return HttpResponse.json({
          status: 200,
        });
      }

      return HttpResponse.json({
        status: 404,
      });
    },
  ),
];
