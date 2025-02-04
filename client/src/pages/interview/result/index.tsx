import { useGetInterviewList, useGetInterviewResult } from '@/api/interview';
import SearchModal from '@/components/interview/searchModal';
import SideMenu from '@/components/interview/sideMenu';
import InterviewFeedback from '@/components/interview/interviewFeedback';
import { InterviewListResponse, InterviewResultResponse } from '@/types/interview';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import InterviewMyAnswer from '@/components/interview/myAnswer';
import convertDate from '@/utils/convertDate';
import Icon from '@/components/common/icon';

const InterviewResultPage = () => {
  const navigate = useNavigate();
  const { interviewId } = useParams();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: result } = useGetInterviewResult(Number(interviewId));
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

  const { data: interviewList } = useGetInterviewList();
  const [interviewListData, setInterviewListData] = useState<InterviewListResponse[]>([
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
  ]);

  useEffect(() => {
    if (interviewList) {
      setInterviewListData(interviewList);
    }
  }, [interviewList]);

  if (!resultData) return null;

  const handleMenuClick = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const onButtonClick = () => {
    navigate(`/interview/result/${resultData.interviewId}/answers`);
  };

  const onInterviewClick = (interviewId: number) => {
    navigate(`/interview/result/${interviewId}`);
  };

  const formatDate = convertDate(resultData.date).split('-');

  return (
    <div className="min-h-full bg-Main p-6 md:p-10">
      {/* 사이드바 넓이 만큼 왼쪽 마진 조절 */}
      <div
        className={`relative flex pt-[94px] transition-all duration-500 sm:pt-16 ${
          isSideMenuOpen ? 'md:ml-[280px] lg:ml-[300px]' : 'ml-0'
        }`}
      >
        <SideMenu
          isOpen={isSideMenuOpen}
          interviewList={interviewListData}
          handleMenuClick={handleMenuClick}
          handleSearchClick={() => setIsModalOpen(true)}
          onInterviewClick={onInterviewClick}
        />

        {/* 모바일/태블릿 뷰 (md 미만) */}
        <div className="flex w-full flex-col gap-6 lg:hidden">
          <button className="flex items-center gap-4">
            {!isSideMenuOpen ? (
              <Icon id="menu" size={20} onClick={() => setIsSideMenuOpen(true)} className="h-auto md:w-6" />
            ) : null}
            <span className="text-xl font-semibold md:text-2xl">
              {`${formatDate[0]}년 ${formatDate[1]}월 ${formatDate[2]}일`}
            </span>
          </button>
          <Tabs defaultValue="myAnswer" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2 rounded-lg bg-stone-50 p-1 shadow-sm">
              <TabsTrigger
                value="myAnswer"
                className="rounded-lg p-2 transition-all duration-200 data-[state=active]:bg-white data-[state=active]:font-semibold data-[state=inactive]:text-stone-700"
              >
                나의 답변
              </TabsTrigger>
              <TabsTrigger
                value="analyze"
                className="rounded-lg p-2 transition-all duration-200 data-[state=active]:bg-white data-[state=active]:font-semibold data-[state=inactive]:text-stone-700"
              >
                답변 분석
              </TabsTrigger>
            </TabsList>
            <TabsContent value="myAnswer">
              <InterviewMyAnswer
                question={resultData.question}
                answer={resultData.memberAnswer}
                onButtonClick={onButtonClick}
              />
            </TabsContent>
            <TabsContent value="analyze">
              <InterviewFeedback
                keywords={resultData.keywords}
                strength={resultData.strength}
                weakness={resultData.weakness}
                answer={resultData.answer}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* 데스크탑 뷰 (lg 이상) */}
        <div className="hidden w-full flex-col gap-8 lg:flex lg:flex-row">
          <div className="flex flex-[4.5] flex-col gap-6">
            <button className="flex items-center gap-4">
              {!isSideMenuOpen ? (
                <Icon id="menu" size={20} onClick={() => setIsSideMenuOpen(true)} className="h-auto md:w-6" />
              ) : null}
              <span className="text-xl font-semibold md:text-2xl">
                {`${formatDate[0]}년 ${formatDate[1]}월 ${formatDate[2]}일`}
              </span>
            </button>
            <InterviewMyAnswer
              question={resultData.question}
              answer={resultData.memberAnswer}
              onButtonClick={onButtonClick}
            />
          </div>
          <div className="flex flex-[5.5]">
            <InterviewFeedback
              keywords={resultData.keywords}
              strength={resultData.strength}
              weakness={resultData.weakness}
              answer={resultData.answer}
            />
          </div>
        </div>

        {isModalOpen && <SearchModal onClose={() => setIsModalOpen(false)} onInterviewClick={onInterviewClick} />}
      </div>
    </div>
  );
};

export default InterviewResultPage;
