import Icon from '@/components/common/icon';
import SideMenu from '@/components/today/sidemenu';
import TodayFeedback from '@/components/today/todayfeedback';
import TodayResponse from '@/components/today/todayresponse';
import { useState } from 'react';

const TodayResultPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const onMenuClick = () => {
    setIsOpen(!isOpen)
  }
  
  const onButtonClick = () => {
    console.log('다른 사람의 답변 이동');
  };

  // 더미데이터
  const todayData = {
    question: 'OOP의 5가지 설계 원칙 (SOLID)이란 무엇인가요?',
    answer:
      'SOLID는 객체지향 프로그래밍의 5가지 핵심 설계 원칙을 말합니다. 각각의 원칙들이 소프트웨어의 유지보수성과 확장성을 높이는 데 매우 중요한 역할을 합니다. 첫째로, 단일 책임 원칙(SRP)입니다. 이는 "한 클래스는 한 가지 책임만 가져야 한다"는 원칙입니다. 예를 들어, 주문 시스템에서 OrderService라는 클래스가 있다면, 이 클래스는 주문 처리에 관한 책임만 가져야 하고, 결제나 배송 관련 로직은 별도의 클래스로 분리해야 합니다.',
    rate: 'A+',
    keywords: [
      {
        title: 'SRP',
        correct: true,
      },

      {
        title: 'OCP',
        correct: false,
      },
      {
        title: 'LSP',
        correct: false,
      },
      {
        title: 'ISP',
        correct: false,
      },
      {
        title: 'DIP',
        correct: false,
      },
    ],
    strength: 'SOLID가 무엇인지 명확하게 정의하면서 시작해 질문의 핵심을 바로 짚었습니다',
    weakness: 'SOLID의 나머지 4가지 원칙에 대한 설명이 누락되어 있습니다',
    modelanswer:
      'SOLID는 객체지향 프로그래밍의 5가지 핵심 설계 원칙을 말합니다. 각각의 원칙들은 유지보수가 용이하고 확장성 있는 소프트웨어를 만들기 위한 기본 지침이 됩니다. 첫째, 단일 책임 원칙(Single Responsibility Principle)은 한 클래스가 하나의 책임만 가져야 한다는 원칙입니다. 예를 들어, 주문 처리 클래스는 주문 관련 로직만 다뤄야 하며, 결제나 배송 로직은 별도 클래스로 분리합니다.',
  };

  return (
    // 사이드바 넓이 만큼 왼쪽 마진 조절
    <div className={`relative flex transition-all duration-500 h-full ${isOpen ? 'ml-[350px]' : 'ml-0'}`}>
      <SideMenu isOpen={isOpen} onMenuClick={onMenuClick} />
      
      <div className="flex w-full h-full gap-8">
        <div className="flex flex-col gap-6 flex-[4.5] h-fit">
          <button className="flex items-center gap-4">
            {!isOpen ? <Icon id="menu" size={24} onClick={() => setIsOpen(true)} /> : <></>}
            <span className="text-2xl font-semibold">2025년 01월 16일</span>
          </button>
          <TodayResponse question={todayData.question} answer={todayData.answer} />
          <div className="flex justify-end w-full">
            <button
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-primary-500"
              onClick={onButtonClick}
            >
              <span className='text-xl font-semibold text-white'>다른 사람의 답변</span>
              <Icon id='move' size={20}/>
            </button>
          </div>
        </div>

        <div className="flex flex-[5.5] h-full">
          <TodayFeedback
            rate={todayData.rate}
            keywords={todayData.keywords}
            strength={todayData.strength}
            weakness={todayData.weakness}
            modelanswer={todayData.modelanswer}
          />
        </div>
      </div>
    </div>
  );
};

export default TodayResultPage;
