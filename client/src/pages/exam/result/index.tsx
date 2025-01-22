import InfoSection from '@/components/exam/infoSection';
import SubmitButton from '@/components/common/submitButton';
import ProblemStatusButton from '@/components/exam/infoSection/problemStatusButton';
import ExamSolution from '@/components/exam/solution';
import ExamProblem from '@/components/exam/problem';

// 더미데이터
const examProblems = [
  {
    id: 1,
    problem: 'HTTPS가 HTTP보다 안전한 이유는 무엇인가요?',
    subject: '네트워크',
    questionType: 'objective',
    options: [
      { content: '데이터 압축을 지원하기 때문' },
      { content: '대칭키 암호를 지원하기 때문' },
      { content: '인증서 기반의 데이터 암호화를 사용하기 때문' },
      { content: '빠른 속도를 제공하기 때문' },
    ],
    chosenAnswer: '데이터 압축을 지원하기 때문',
    answer: '인증서 기반의 데이터 암호화를 사용하기 때문',
    answerStatus: false,
    bookmarkStatus: false,
    explaination:
      'HTTPS는 SSL/TLS 프로토콜을 사용하여 데이터를 암호화하고, 서버 인증서를 통해 통신 상대방을 신뢰할 수 있음을 보장합니다. 이를 통해 데이터가 도청, 변조, 위조되지 않도록 보호합니다. HTTP는 암호화를 지원하지 않아 중간에서 공격에 취약합니다.',
    correctRate: 72,
  },
  {
    id: 2,
    problem: '다음 중 OSI 7계층에 해당하지 않는 것은 무엇인가요?',
    subject: '네트워크',
    questionType: 'objective',
    options: [
      { content: '물리 계층' },
      { content: '전송 계층' },
      { content: '데이터베이스 계층' },
      { content: '응용 계층' },
    ],
    chosenAnswer: '데이터베이스 계층',
    answer: '데이터베이스 계층',
    answerStatus: true,
    bookmarkStatus: true,
    explaination: 'OSI 7계층에는 데이터베이스 계층이 없습니다.',
    correctRate: 85,
  },
  {
    id: 3,
    problem: 'TCP와 UDP의 차이점을 설명하세요.',
    subject: '네트워크',
    questionType: 'subjective',
    options: [],
    chosenAnswer: 'TCP는 신뢰성이 높고 UDP는 빠르다.',
    answer: 'TCP는 신뢰성이 높고 UDP는 빠르다.',
    answerStatus: true,
    bookmarkStatus: false,
    explaination: 'TCP는 연결 기반으로 신뢰성을 보장하고, UDP는 비연결 기반으로 빠릅니다.',
    correctRate: 65,
  },
  {
    id: 4,
    problem: 'DNS는 무엇을 하는 서비스인가요?',
    subject: '네트워크',
    questionType: 'objective',
    options: [
      { content: '도메인을 IP로 변환' },
      { content: '파일 전송' },
      { content: '암호화' },
      { content: '패킷 분할' },
    ],
    chosenAnswer: '도메인을 IP로 변환',
    answer: '도메인을 IP로 변환',
    answerStatus: true,
    bookmarkStatus: true,
    explaination: 'DNS는 도메인 이름을 IP 주소로 변환하는 서비스입니다.',
    correctRate: 92,
  },
  {
    id: 5,
    problem: 'SSL/TLS의 주요 목적은 무엇인가요?',
    subject: '네트워크',
    questionType: 'objective',
    options: [{ content: '암호화' }, { content: '데이터 압축' }, { content: '패킷 분할' }, { content: '라우팅' }],
    chosenAnswer: '데이터 압축',
    answer: '암호화',
    answerStatus: false,
    bookmarkStatus: false,
    explaination: 'SSL/TLS는 암호화와 인증서를 사용하여 데이터 보안을 보장합니다.',
    correctRate: 88,
  },
];

const processedExamProblems = examProblems.map((problem) => {
  // options 배열에 state 추가
  const updatedOptions = problem.options.map((option) => {
    if (option.content === problem.answer) {
      return { ...option, state: 'correct' }; // 정답 옵션
    }
    if (problem.answerStatus === false && option.content === problem.chosenAnswer) {
      return { ...option, state: 'wrong' }; // 오답 옵션
    }
    return { ...option, state: 'default' }; // 기본 상태
  });

  return { ...problem, options: updatedOptions };
});

const ExamResultPage = () => {
  return (
    <div className="flex w-full gap-20 bg-Main px-16 py-10">
      {/* Problem & Solution Section */}
      <div className="flex w-[920px] flex-1 flex-col gap-10">
        {processedExamProblems.map((problem) => (
          <div key={problem.id} className="flex flex-col gap-2">
            <ExamProblem
              problem={{
                id: problem.id,
                content: problem.problem,
                subject: problem.subject,
                isBookmarked: problem.bookmarkStatus,
                questionType: problem.questionType,
                options: problem.options,
                chosenAnswer: problem.chosenAnswer,
              }}
              disabled={true}
            />
            <ExamSolution
              answer={problem.answer}
              correctRate={problem.correctRate}
              explaination={problem.explaination}
            />
          </div>
        ))}
      </div>
      {/* Info Section */}
      <div className="relative w-[380px] min-w-[380px] flex-shrink-0">
        <div className="sticky top-10 flex flex-col gap-10">
          <InfoSection>
            <span className="text-3xl">제 1회 모의고사</span>
          </InfoSection>
          <InfoSection title="점수" icon="score">
            <div>
              <span className="text-primary-500">60</span> / 100
            </div>
          </InfoSection>
          <InfoSection title="풀이 현황" icon="problem">
            <div className="grid grid-cols-5 gap-3">
              {processedExamProblems.map((problem) => (
                <ProblemStatusButton
                  key={problem.id}
                  text={problem.id.toString()}
                  status={problem.answerStatus ? 'correct' : 'wrong'} // 문제의 정답 여부를 기반으로 상태 설정
                  onClick={() => {
                    document.getElementById(`problem-${problem.id}`)?.scrollIntoView({ behavior: 'smooth' }); // 문제로 이동
                  }}
                />
              ))}
            </div>
          </InfoSection>
          <SubmitButton text="확인 완료" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default ExamResultPage;
