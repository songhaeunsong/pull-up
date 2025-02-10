import { useGetInterviewList, useGetInterviewResult } from '@/api/interview';
import SearchModal from '@/components/interview/searchModal';
import SideMenu from '@/components/interview/sideMenu';
import InterviewFeedback from '@/components/interview/interviewFeedback';
import { InterviewListResponse, InterviewResultResponse } from '@/types/interview';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import InterviewMyAnswer from '@/components/interview/myAnswer';
import convertDate from '@/utils/convertDate';
import Icon from '@/components/common/icon';
import { memberStore } from '@/stores/memberStore';

const InterviewResultPage = () => {
  const navigate = useNavigate();
  const { interviewAnswerId } = memberStore();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: result, isLoading: isResultLoading } = useGetInterviewResult(interviewAnswerId);
  const [resultData, setResultData] = useState<InterviewResultResponse>();
  const { data: interviewList, isLoading: isInterviewLoading } = useGetInterviewList();
  const [interviewListData, setInterviewListData] = useState<InterviewListResponse[]>();

  useEffect(() => {
    if (!isResultLoading) {
      setResultData(result);
    }

    if (!isInterviewLoading) {
      setInterviewListData(interviewList);
      console.log(interviewListData);
    }
  }, [result, interviewList, isResultLoading, isInterviewLoading]);

  if (!resultData || !interviewListData) {
    return null;
  }

  const handleMenuClick = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const onButtonClick = () => {
    navigate(`/interview/result/${resultData.interviewId}/answers`);
  };

  const onInterviewClick = (interviewId: number) => {
    navigate(`/interview/result/${interviewId}`);
  };

  const formatDate = convertDate(resultData.createdAt).split('-');

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
