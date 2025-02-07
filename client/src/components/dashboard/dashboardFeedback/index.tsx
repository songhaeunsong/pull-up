import { useGetInterviewResult } from '@/api/interview';
import { memberStore } from '@/stores/memberStore';
import Icon from '@/components/common/icon';
import { InterviewResultResponse } from '@/types/interview';
import { useEffect, useState } from 'react';

const DashboardFeedback = () => {
  const { data: result } = useGetInterviewResult(1);
  const { setIsSolvedToday, setInterviewId } = memberStore();
  const [resultData, setResultData] = useState<InterviewResultResponse>({
    interviewId: 1,
    question: 'Checked Exception과 Unchecked Exception의 차이는 ?',
    memberAnswer:
      'Checked Exception은은 컴파일 시점에 체크되며 반드시 예외 처리를 해야 하고, Unchecked Exception은 런타임 시점에 발생하는 예외로 명시적인 예외 처리를 강제하지 않는다.',
    keywords: ['컴파일 시점', '런타임 시점', '예외 처리 강제'],
    strength:
      'Checked Exception이 컴파일 시점에서 체크된다는 점과 예외 처리가 강제된다는 점을 잘 언급하였고, Unchecked Exception이 런타임 시점에서 발생하며 예외 처리가 강제되지 않는다는 점을 명확하게 설명하였습니다. 또한, 짧지만 핵심적인 내용을 담고 있어 면접관이 빠르게 이해할 수 있습니다.',
    weakness:
      'Checked Exception은 try-catch 또는 throws로 반드시 처리해야 한다는 점을 명확히 하면 좋습니다. 또한, Unchecked Exception의 경우 RuntimeException을 상속받아 명시적인 예외 처리를 강제하지 않는다는 점을 보강하면 더 완벽한 답변이 될 것 같습니다.',
    answer:
      'Checked Exception과 Unchecked Exception의 차이는 예외 처리의 강제 여부에 있습니다. Checked Exception은 컴파일 시점에 체크되며, IOException이나 SQLException처럼 반드시 try-catch로 처리하거나 throws로 선언해야 합니다. 반면, Unchecked Exception은 NullPointerException, ArrayIndexOutOfBoundsException처럼 RuntimeException을 상속받아 예외 처리를 강제하지 않으며, 주로 프로그래머의 실수로 인해 발생합니다. 예를 들어, 파일을 열 때 FileNotFoundException이 발생할 수 있으므로 예외 처리를 강제하지만, NullPointerException은 개발자가 적절한 로직을 구현하면 방지할 수 있습니다. 즉, Checked Exception은 프로그램 실행을 예측 가능한 예외에 대비하도록 강제하고, Unchecked Exception은 개발자의 책임으로 남기는 차이가 있습니다.',
    date: '2025-02-05T14:28:35.123456789',
  });

  useEffect(() => {
    if (result) {
      setResultData(result);
    }
  }, [result]);

  return (
    <div className="flex gap-3">
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-1 items-center rounded-xl border border-stone-200 p-6">
          <span className="break-keep text-center text-lg font-bold">{resultData.question}</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-stone-200">
          <div className="w-fit rounded-md bg-primary-500 px-3 py-1 text-sm text-white">키워드</div>
          <div className="flex flex-wrap justify-center gap-3">
            {resultData.keywords.map((keyword, id) => (
              <div key={id}>{keyword}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 rounded-xl border border-stone-200 p-5">
        <div className="flex gap-2">
          <Icon id={'ai'} size={24} />
          <span className="text-xl font-semibold text-stone-950">AI 피드백</span>
        </div>
        <section>
          <span className="text-lg font-semibold text-primary-500">강점</span>
          <p>{resultData.strength}</p>
        </section>
        <section>
          <span className="text-lg font-semibold text-primary-500">개선점</span>
          <p>{resultData.weakness}</p>
        </section>
      </div>
    </div>
  );
};

export default DashboardFeedback;
