import Icon from '@/components/common/icon';
import SearchBar from '@/components/common/searchbar';
import { useState } from 'react';
import MenuItem from '../sideMenu/menuitem';

interface SearchModalProps {
  onClose: () => void;
  onInterviewClick: (interviewId: number) => void;
}

const SearchModal = ({ onClose, onInterviewClick }: SearchModalProps) => {
  const [value, setValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // 더미데이터
  const dummyData = [
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
  ];

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/50 pt-[200px]">
      <div className="flex h-[400px] w-[600px] flex-col gap-6 rounded-3xl bg-white p-8 shadow-md">
        <div className="flex w-full flex-none gap-6">
          <SearchBar value={value} onChange={onChange} />
          <button onClick={onClose}>
            <Icon id="close" size={30} />
          </button>
        </div>
        <div className="flex min-h-0 w-full flex-1 flex-col gap-3">
          <div className="flex-none text-lg font-semibold">오늘의 질문</div>
          <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
            {dummyData.map((item, id) => (
              <MenuItem key={id} title={item.question} onInterviewClick={() => onInterviewClick(item.interviewId)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
