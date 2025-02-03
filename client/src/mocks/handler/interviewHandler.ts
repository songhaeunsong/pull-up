import { http, HttpResponse } from 'msw';

// 좋아요 추적
const likeStatusMap = new Map<string, boolean>();
likeStatusMap.set('1', true);
likeStatusMap.set('2', false);

export const interviewHandler = [
  // 오늘의 문제 조회
  http.get('https://api.pull-up.store/interview', async () => {
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

  // 답안 제출
  http.post('https://api.pull-up.store/interview/:interviewId/submit', async ({ params, request }) => {
    const { interviewId } = params;
    const { answer } = (await request.json()) as { answer: string };

    if (interviewId && answer) {
      return HttpResponse.json(
        {
          interviewId: 1,
          interviewAnswerId: 1,
        },
        {
          status: 201,
        },
      );
    }

    return HttpResponse.json({
      status: 404,
    });
  }),

  // 결과 조회
  http.get('https://api.pull-up.store/interview/result/:interviewAnswerId', async ({ params }) => {
    const { interviewAnswerId } = params;

    if (interviewAnswerId) {
      return HttpResponse.json(
        {
          interviewId: 1,
          question: 'Checked Exception과 Unchecked Exception의 차이는 ?',
          memberAnswer:
            'Checked Exception은 RuntimeException을 상속하지 않은 클래스이며, 예외처리를 반드시 해줘야 하고, Unchecked Exception은 코드에 개발자가 예상치 못한 에러가 발생할 수 있기 때문에 예외처리를 강제하지 않는다.',
          keywords: ['Java', 'Exception'],
          grade: 'A',
          date: '2025-01-24',
          strength:
            '답변이 Checked Exception과 Unchecked Exception의 차이를 간단하고 명확하게 설명했으며, 두 예외의 특성과 처리 방식에 대한 기본적인 개념을 잘 전달하고 있습니다. 또한, Checked Exception이 RuntimeException을 상속하지 않는다는 기술적인 사실을 정확히 언급한 점이 돋보입니다.',
          weakness:
            '답변이 기본적인 개념에 집중되어 있어, 예외 처리와 관련된 실제 코드 예제나 구체적인 사례가 부족합니다. 이를 보완하기 위해 각각의 예외가 어떻게 사용되는지에 대한 실질적인 코드 예제와 활용 맥락을 추가하면 더욱 풍부한 답변이 될 것입니다.',
          answer:
            'Checked Exception과 Unchecked Exception은 Java에서 예외를 처리하는 두 가지 주요 방식으로, 컴파일러가 강제하는지 여부에 따라 구분됩니다. Checked Exception은 컴파일러가 try-catch로 처리하거나 throws로 선언할 것을 강제합니다. `IOException`, `SQLException` 등이 그 예입니다. 이를 통해 예측 가능한 오류 처리가 가능하지만, 코드가 다소 장황해질 수 있습니다. Unchecked Exception은 컴파일러가 처리 여부를 강제하지 않으며, 런타임 시 발생합니다. `NullPointerException`, `ArrayIndexOutOfBoundsException` 등이 여기에 해당합니다. 코드가 간결해지지만, 미처 처리되지 않은 오류로 인해 런타임 에러가 발생할 가능성이 있습니다. 결론적으로, Checked Exception은 예측 가능하고 복구 가능한 오류에 적합하며, Unchecked Exception은 프로그래밍 로직 오류나 예외적인 상황에 더 적합합니다. 상황에 따라 적절히 선택하여 사용하는 것이 중요합니다.',
        },
        {
          status: 200,
        },
      );
    }

    return HttpResponse.json({
      status: 404,
    });
  }),

  // 지난 오늘의 문제 전체 목록 조회
  http.get('https://api.pull-up.store/interview/me/all', async () => {
    const isError = false;

    if (!isError) {
      return HttpResponse.json(
        [
          {
            interviewId: 1,
            interviewAnswerId: 1,
            question: 'OOP의 5가지 설계 원칙 (SOLID)이란 무엇인가요?',
          },
          {
            interviewId: 2,
            interviewAnswerId: 2,
            question: 'Checked Exception과 Unchecked Exception의 차이는 ?',
          },
        ],
        {
          status: 200,
        },
      );
    }

    return HttpResponse.json({
      status: 404,
    });
  }),

  // 다른 사람 답변 전체 목록 조회
  http.get('https://api.pull-up.store/interview/:interviewId/all', async ({ params }) => {
    const { interviewId } = params;

    if (interviewId) {
      return HttpResponse.json(
        [
          {
            interviewId: 1,
            interviewAnswerId: 1,
            memberName: '홍길동',
            date: '2025-01-16T14:28:35.123456789',
            answer:
              'Checked Exception과 Unchecked Exception은 Java에서 예외를 처리하는 두 가지 주요 방식으로, 컴파일러가 강제하는지 여부에 따라 구분됩니다. Checked Exception은 컴파일러가 try-catch로 처리하거나 throws로 선언할 것을 강제합니다. `IOException`, `SQLException` 등이 그 예입니다. 이를 통해 예측 가능한 오류 처리가 가능하지만, 코드가 다소 장황해질 수 있습니다. Unchecked Exception은 컴파일러가 처리 여부를 강제하지 않으며, 런타임 시 발생합니다. `NullPointerException`, `ArrayIndexOutOfBoundsException` 등이 여기에 해당합니다. 코드가 간결해지지만, 미처 처리되지 않은 오류로 인해 런타임 에러가 발생할 가능성이 있습니다. 결론적으로, Checked Exception은 예측 가능하고 복구 가능한 오류에 적합하며, Unchecked Exception은 프로그래밍 로직 오류나 예외적인 상황에 더 적합합니다. 상황에 따라 적절히 선택하여 사용하는 것이 중요합니다.',
            isLiked: likeStatusMap.get('1'),
            likeCount: 1000,
            commentCount: 1000,
          },
          {
            interviewId: 1,
            interviewAnswerId: 2,
            memberName: '홍길동',
            date: '2025-01-16T14:28:35.123456789',
            answer:
              'Checked Exception과 Unchecked Exception은 Java에서 예외를 처리하는 두 가지 주요 방식으로, 컴파일러가 강제하는지 여부에 따라 구분됩니다. Checked Exception은 컴파일러가 try-catch로 처리하거나 throws로 선언할 것을 강제합니다. `IOException`, `SQLException` 등이 그 예입니다. 이를 통해 예측 가능한 오류 처리가 가능하지만, 코드가 다소 장황해질 수 있습니다. Unchecked Exception은 컴파일러가 처리 여부를 강제하지 않으며, 런타임 시 발생합니다. `NullPointerException`, `ArrayIndexOutOfBoundsException` 등이 여기에 해당합니다. 코드가 간결해지지만, 미처 처리되지 않은 오류로 인해 런타임 에러가 발생할 가능성이 있습니다. 결론적으로, Checked Exception은 예측 가능하고 복구 가능한 오류에 적합하며, Unchecked Exception은 프로그래밍 로직 오류나 예외적인 상황에 더 적합합니다. 상황에 따라 적절히 선택하여 사용하는 것이 중요합니다.',
            isLiked: likeStatusMap.get('2'),
            likeCount: 1000,
            commentCount: 1000,
          },
        ],
        {
          status: 200,
        },
      );
    }

    return HttpResponse.json({
      status: 404,
    });
  }),

  // 다른 사람 답변 상세 조회
  http.get('https://api.pull-up.store/interview/:interviewId/:interviewAnswerId', async ({ params }) => {
    const { interviewId, interviewAnswerId } = params;

    if (interviewId && interviewAnswerId) {
      return HttpResponse.json(
        {
          interviewAnswerId: 1,
          memberName: '홍길동',
          date: '2025-01-16T14:28:35.123456789',
          keywords: ['java', 'exception'],
          answer:
            'Checked Exception과 Unchecked Exception은 Java에서 예외를 처리하는 두 가지 주요 방식으로, 컴파일러가 강제하는지 여부에 따라 구분됩니다. Checked Exception은 컴파일러가 try-catch로 처리하거나 throws로 선언할 것을 강제합니다. `IOException`, `SQLException` 등이 그 예입니다. 이를 통해 예측 가능한 오류 처리가 가능하지만, 코드가 다소 장황해질 수 있습니다. Unchecked Exception은 컴파일러가 처리 여부를 강제하지 않으며, 런타임 시 발생합니다. `NullPointerException`, `ArrayIndexOutOfBoundsException` 등이 여기에 해당합니다. 코드가 간결해지지만, 미처 처리되지 않은 오류로 인해 런타임 에러가 발생할 가능성이 있습니다. 결론적으로, Checked Exception은 예측 가능하고 복구 가능한 오류에 적합하며, Unchecked Exception은 프로그래밍 로직 오류나 예외적인 상황에 더 적합합니다. 상황에 따라 적절히 선택하여 사용하는 것이 중요합니다.',
          likeCount: 1000,
          commentCount: 1000,
          commentList: [
            {
              commentId: 1,
              otherMemberName: '홍길원',
              email: 'email@gmail.com',
              comment: '면접 때 도움이 되었습니다. 매우 유용해요 ㅎㅎ',
            },
            {
              commentId: 2,
              otherMemberName: '홍길투',
              email: 'email2@gmail.com',
              comment: '면접 때 도움이 되었습니다.',
            },
          ],
        },
        {
          status: 200,
        },
      );
    }

    return HttpResponse.json({
      status: 404,
    });
  }),

  // 다른 사람 답변 좋아요
  http.post('https://api.pull-up.store/interview/:interviewAnswerId/like', async ({ params }) => {
    const { interviewAnswerId } = params;

    const currentStatus = likeStatusMap.get(String(interviewAnswerId));
    const liked = !currentStatus;
    likeStatusMap.set(String(interviewAnswerId), liked);

    if (interviewAnswerId) {
      return HttpResponse.json(
        {
          isLike: liked,
        },
        { status: 200 },
      );
    }

    return HttpResponse.json({ status: 404 });
  }),
];
