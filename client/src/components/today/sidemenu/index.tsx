import Icon from '@/components/common/icon';
import MenuList from './menulist';
import { useGetInterviewList } from '@/api/interview';
import { useEffect, useState } from 'react';
import { InterviewListResponse } from '@/types/interview';

interface SideMenuProps {
  isOpen: boolean;
  handleMenuClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleSearchClick: () => void;
}

const SideMenu = ({ isOpen, handleMenuClick, handleSearchClick }: SideMenuProps) => {
  const { data: interviewList } = useGetInterviewList();
  const [data, setData] = useState<InterviewListResponse>();

  useEffect(() => {
    if (!interviewList) {
      setData([
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
    } else {
      setData(interviewList);
    }
  }, []);

  if (!data) return null;

  return (
    <div
      className={`fixed left-0 top-[68px] z-30 h-full border-r border-primary-200 bg-white transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-full w-[350px] flex-col gap-9 px-6 py-10">
        <div className="flex justify-between">
          <button onClick={handleMenuClick}>
            <Icon id="menu" />
          </button>
          <button onClick={handleSearchClick}>
            <Icon id="search" />
          </button>
        </div>
        <MenuList items={data} />
      </div>
    </div>
  );
};

export default SideMenu;
