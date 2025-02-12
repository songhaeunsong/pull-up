import Icon from '@/components/common/icon';
import SearchBar from '@/components/common/searchbar';
import { useState } from 'react';
import MenuItem from '../sideMenu/menuitem';
import { InterviewListResponse } from '@/types/response/interview';
import { getInterviewListByKeyword } from '@/api/interview';
import debounce from '@/utils/debounce';
import { toast } from 'react-toastify';

interface SearchModalProps {
  onClose: () => void;
  onInterviewClick: (interviewId: number) => void;
}

const SearchModal = ({ onClose, onInterviewClick }: SearchModalProps) => {
  const [searchList, setSearchList] = useState<InterviewListResponse[]>();
  const [value, setValue] = useState('');

  const debounceSearch = debounce(async (searchValue: string) => {
    try {
      if (searchValue.trim().length > 0) {
        const data = await getInterviewListByKeyword(searchValue);
        setSearchList(data);
      } else {
        setSearchList([]);
      }
    } catch (error) {
      console.error('검색을 실패했습니다.', error);
      setSearchList([]);
      toast.error('검색을 실패했습니다.', { position: 'bottom-center' });
    }
  }, 300);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setValue(searchValue);
    debounceSearch(searchValue);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/50 pt-[200px]">
      <div className="flex h-[350px] w-[300px] flex-col gap-6 rounded-3xl bg-white p-6 shadow-md md:h-[400px] md:w-[600px] md:p-8">
        <div className="flex w-full flex-none gap-3 md:gap-6">
          <SearchBar value={value} onChange={onChange} />
          <button onClick={onClose}>
            <Icon id="close" size={24} className="h-auto md:w-[30px]" />
          </button>
        </div>
        <div className="flex min-h-0 w-full flex-1 flex-col gap-3">
          <div className="flex-none text-lg font-semibold">오늘의 질문</div>
          <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
            {searchList && searchList.length > 0 ? (
              searchList.map((item, id) => (
                <MenuItem
                  key={id}
                  title={item.question}
                  onInterviewClick={() => onInterviewClick(item.interviewAnswerId)}
                />
              ))
            ) : (
              <div>검색 결과가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
