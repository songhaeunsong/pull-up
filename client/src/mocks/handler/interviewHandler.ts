import { http, HttpResponse } from 'msw';

// 좋아요 추적
const likeStatusMap = new Map<string, boolean>();
likeStatusMap.set('1', true);
likeStatusMap.set('2', false);
likeStatusMap.set('3', true);
likeStatusMap.set('4', true);
likeStatusMap.set('5', false);

export const interviewHandler = [
  // 오늘의 문제 조회
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

  // 답안 제출
  http.post('http://localhost:8080/api/v1/interview/:interviewId/submit', async ({ params, request }) => {
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
  http.get('http://localhost:8080/api/v1/interview/result/:interviewAnswerId', async ({ params }) => {
    const { interviewAnswerId } = params;

    if (interviewAnswerId) {
      return HttpResponse.json(
        {
          interviewId: 1,
          question: 'Checked Exception과 Unchecked Exception의 차이는 ?',
          memberAnswer:
            'Checked Exception은은 컴파일 시점에 체크되며 반드시 예외 처리를 해야 하고, Unchecked Exception은 런타임 시점에 발생하는 예외로 명시적인 예외 처리를 강제하지 않는다.',
          keywords: ['컴파일 시점', '런타임 시점', '예외 처리 강제'],
          grade: 'A',
          date: '2025-01-24',
          strength:
            'Checked Exception이 컴파일 시점에서 체크된다는 점과 예외 처리가 강제된다는 점을 잘 언급하였고, Unchecked Exception이 런타임 시점에서 발생하며 예외 처리가 강제되지 않는다는 점을 명확하게 설명하였습니다. 또한, 짧지만 핵심적인 내용을 담고 있어 면접관이 빠르게 이해할 수 있습니다.',
          weakness:
            'Checked Exception은 try-catch 또는 throws로 반드시 처리해야 한다는 점을 명확히 하면 좋습니다. 또한, Unchecked Exception의 경우 RuntimeException을 상속받아 명시적인 예외 처리를 강제하지 않는다는 점을 보강하면 더 완벽한 답변이 될 것 같습니다.',
          answer:
            'Checked Exception과 Unchecked Exception의 차이는 예외 처리의 강제 여부에 있습니다. Checked Exception은 컴파일 시점에 체크되며, IOException이나 SQLException처럼 반드시 try-catch로 처리하거나 throws로 선언해야 합니다. 반면, Unchecked Exception은 NullPointerException, ArrayIndexOutOfBoundsException처럼 RuntimeException을 상속받아 예외 처리를 강제하지 않으며, 주로 프로그래머의 실수로 인해 발생합니다. 예를 들어, 파일을 열 때 FileNotFoundException이 발생할 수 있으므로 예외 처리를 강제하지만, NullPointerException은 개발자가 적절한 로직을 구현하면 방지할 수 있습니다. 즉, Checked Exception은 프로그램 실행을 예측 가능한 예외에 대비하도록 강제하고, Unchecked Exception은 개발자의 책임으로 남기는 차이가 있습니다.',
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
  http.get('http://localhost:8080/api/v1/interview/me/all', async () => {
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
  http.get('http://localhost:8080/api/v1/interview/:interviewId/all', async ({ params }) => {
    const { interviewId } = params;

    if (interviewId) {
      return HttpResponse.json(
        [
          {
            interviewId: 1,
            interviewAnswerId: 1,
            memberName: '김싸피',
            date: '2025-01-16T14:28:35.123456789',
            answer:
              'Checked Exception은 컴파일러가 예외 처리를 강제하는 예외로, IOException, SQLException 등이 이에 해당합니다. 반드시 try-catch로 감싸거나 throws로 선언해야 합니다. 반면, Unchecked Exception은 NullPointerException, ArithmeticException처럼 RuntimeException을 상속하며, 컴파일러가 예외 처리를 강제하지 않습니다. Checked Exception은 예상 가능한 예외(파일 미존재 등)를 처리하는 데 유용하고, Unchecked Exception은 주로 프로그래밍 오류(잘못된 값 접근 등)에서 발생합니다.',
            isLiked: likeStatusMap.get('1'),
            likeCount: 123,
            commentCount: 14,
          },
          {
            interviewId: 1,
            interviewAnswerId: 2,
            memberName: '박싸피',
            date: '2025-01-08T14:28:35.123456789',
            answer:
              'Checked Exception과 Unchecked Exception의 가장 큰 차이는 예외 처리의 강제성입니다. Checked Exception은 Exception 클래스를 상속하지만 RuntimeException을 제외한 모든 예외를 포함하며, try-catch 또는 throws를 사용해 처리해야 합니다. 반면, Unchecked Exception은 RuntimeException을 상속하며, 예외 처리가 필수가 아닙니다. Checked Exception은 외부 환경(파일, 네트워크, DB)에서 발생하는 예외를 처리하는 데 사용되고, Unchecked Exception은 프로그래밍 로직 오류(잘못된 배열 인덱스 접근, null 값 참조 등)에서 발생합니다.',
            isLiked: likeStatusMap.get('2'),
            likeCount: 78,
            commentCount: 7,
          },
          {
            interviewId: 1,
            interviewAnswerId: 3,
            memberName: '박싸피',
            date: '2025-01-15T14:28:35.123456789',
            answer:
              'Checked Exception은 안전벨트 같은 것입니다. 개발자가 예외를 대비하도록 컴파일러가 강제하기 때문이죠. 예를 들어, 파일을 읽을 때 파일이 존재하지 않을 수도 있으므로 IOException 처리를 강제합니다. 반면, Unchecked Exception은 넘어지지 않도록 조심하는 것과 비슷합니다. NullPointerException처럼 개발자가 실수를 하지 않으면 발생하지 않는 예외이기 때문입니다.',
            isLiked: likeStatusMap.get('3'),
            likeCount: 24,
            commentCount: 7,
          },
          {
            interviewId: 1,
            interviewAnswerId: 4,
            memberName: '최싸피',
            date: '2025-01-25T14:28:35.123456789',
            answer:
              'Checked Exception은 컴파일 시점에 체크되며, 예외 처리를 강제합니다. 예를 들어, IOException은 반드시 try-catch나 throws로 처리해야 합니다. 반면, Unchecked Exception은 RuntimeException을 상속하며, 예외 처리를 강제하지 않습니다. 프로그램의 안정성을 높이려면 Checked Exception을 적절히 사용하고, Unchecked Exception은 방어적인 코드로 예방하는 것이 중요합니다.',
            isLiked: likeStatusMap.get('4'),
            likeCount: 15,
            commentCount: 7,
          },
          {
            interviewId: 1,
            interviewAnswerId: 5,
            memberName: '이싸피',
            date: '2025-01-16T14:28:35.123456789',
            answer:
              'Checked Exception은 코드 작성 시점에서 반드시 예외 처리를 해야 하는 예외입니다. 예를 들어, 파일을 읽을 때 IOException이 발생할 수 있어 try-catch로 감싸야 합니다. 반면, Unchecked Exception은 명시적인 예외 처리를 하지 않아도 됩니다. 예를 들어, NullPointerException은 컴파일러가 잡지 않지만, 실행 중에 오류가 발생할 수 있습니다.',
            isLiked: likeStatusMap.get('5'),
            likeCount: 6,
            commentCount: 0,
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
  http.get('http://localhost:8080/api/v1/interview/:interviewId/:interviewAnswerId', async ({ params }) => {
    const { interviewId, interviewAnswerId } = params;

    if (interviewId && interviewAnswerId) {
      return HttpResponse.json(
        {
          interviewAnswerId: 1,
          memberName: '김싸피',
          date: '2025-01-16T14:28:35.123456789',
          keywords: ['컴파일 시점', '런타임 시점', '예외 처리 강제'],
          answer:
            'Checked Exception과 Unchecked Exception은 Java에서 예외를 처리하는 두 가지 주요 방식으로, 컴파일러가 강제하는지 여부에 따라 구분됩니다. Checked Exception은 컴파일러가 try-catch로 처리하거나 throws로 선언할 것을 강제합니다. `IOException`, `SQLException` 등이 그 예입니다. 이를 통해 예측 가능한 오류 처리가 가능하지만, 코드가 다소 장황해질 수 있습니다. Unchecked Exception은 컴파일러가 처리 여부를 강제하지 않으며, 런타임 시 발생합니다. `NullPointerException`, `ArrayIndexOutOfBoundsException` 등이 여기에 해당합니다. 코드가 간결해지지만, 미처 처리되지 않은 오류로 인해 런타임 에러가 발생할 가능성이 있습니다. 결론적으로, Checked Exception은 예측 가능하고 복구 가능한 오류에 적합하며, Unchecked Exception은 프로그래밍 로직 오류나 예외적인 상황에 더 적합합니다. 상황에 따라 적절히 선택하여 사용하는 것이 중요합니다.',
          isLiked: true,
          likeCount: 123,
          commentCount: 14,
          commentList: [
            {
              commentId: 1,
              otherMemberName: '윤답변',
              email: 'email@gmail.com',
              comment:
                '핵심을 잘 정리하셨네요. 특히 "예측 가능하고 복구 가능한 오류"라는 표현이 좋습니다. 다만, Checked Exception이 항상 장황한 건 아니고, 적절한 추상화를 하면 깔끔하게 처리할 수도 있습니다.',
            },
            {
              commentId: 2,
              otherMemberName: '송답변',
              email: 'email2@gmail.com',
              comment:
                'Unchecked Exception이 왜 처리 강제가 없는지 궁금했는데, "프로그램 로직 오류"라는 설명 덕분에 이해가 됐어요! 예제 코드까지 있으면 더 좋을 것 같아요.',
            },
            {
              commentId: 3,
              otherMemberName: '이답변',
              email: 'email2@gmail.com',
              comment:
                '안전벨트(Checked) vs 넘어지지 않도록 조심(Unchecked) 같은 비유가 들어가면 더 직관적으로 이해할 수 있을 것 같아요! 그래도 요점은 확실히 잡아주셨네요.',
            },
            {
              commentId: 4,
              otherMemberName: '강답변',
              email: 'email2@gmail.com',
              comment:
                '개념적으로 깔끔한 정리네요. 다만, "Unchecked Exception이 예외적인 상황에 더 적합하다"는 표현은 조금 더 구체적인 설명이 필요할 것 같습니다.',
            },
            {
              commentId: 5,
              otherMemberName: '정답변',
              email: 'email2@gmail.com',
              comment:
                '면접에서 그대로 써먹어도 될 정도로 정리가 잘 되어 있네요! 마지막 문장처럼 "상황에 따라 선택해야 한다"는 걸 강조하면 더 좋은 답변이 될 것 같아요.',
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
  http.post('http://localhost:8080/api/v1/interview/:interviewAnswerId/like', async ({ params }) => {
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
