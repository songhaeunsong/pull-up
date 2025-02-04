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
      'SOLID는 객체지향 프로그래밍의 5가지 핵심 설계 원칙을 말합니다. 각각의 원칙들이 소프트웨어의 유지보수성과 확장성을 높이는 데 매우 중요한 역할을 합니다. 첫째로, 단일 책임 원칙(SRP)입니다. 이는 "한 클래스는 한 가지 책임만 가져야 한다"는 원칙입니다. 예를 들어, 주문 시스템에서 OrderService라는 클래스가 있다면, 이 클래스는 주문 처리에 관한 책임만 가져야 하고, 결제나 배송 관련 로직은 별도의 클래스로 분리해야 합니다.',
    keywords: ['Java', 'Exception'],
    strength: 'SOLID가 무엇인지 명확하게 정의하면서 시작해 질문의 핵심을 바로 짚었습니다',
    weakness: 'SOLID의 나머지 4가지 원칙에 대한 설명이 누락되어 있습니다',
    answer:
      'SOLID는 객체지향 프로그래밍의 5가지 핵심 설계 원칙을 말합니다. 각각의 원칙들은 유지보수가 용이하고 확장성 있는 소프트웨어를 만들기 위한 기본 지침이 됩니다. 첫째, 단일 책임 원칙(Single Responsibility Principle)은 한 클래스가 하나의 책임만 가져야 한다는 원칙입니다. 예를 들어, 주문 처리 클래스는 주문 관련 로직만 다뤄야 하며, 결제나 배송 로직은 별도 클래스로 분리합니다.',
    date: '2025-01-16T14:28:35.123456789',
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
                answer={resultData.answer}
                onButtonClick={onButtonClick}
              />
            </TabsContent>
            <TabsContent value="analyze">
              <InterviewFeedback
                keywords={resultData.keywords}
                strength={resultData.strength}
                weakness={resultData.weakness}
                answer={resultData.memberAnswer}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* 데스크탑 뷰 (lg 이상) */}
        <div className="hidden w-full flex-col gap-8 lg:flex lg:flex-row">
          <div className="flex flex-[4.5]">
            <InterviewMyAnswer
              question={resultData.question}
              answer={resultData.answer}
              onButtonClick={onButtonClick}
            />
          </div>
          <div className="flex flex-[5.5]">
            <InterviewFeedback
              keywords={resultData.keywords}
              strength={resultData.strength}
              weakness={resultData.weakness}
              answer={resultData.memberAnswer}
            />
          </div>
        </div>

        {isModalOpen && <SearchModal onClose={() => setIsModalOpen(false)} onInterviewClick={onInterviewClick} />}
      </div>
    </div>
  );
};

export default InterviewResultPage;
