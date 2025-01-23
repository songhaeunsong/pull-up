import Modal from '@/components/common/csConditionSelector/temp';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const onConfirmSignUp = () => {
    navigate('/today');
  };

  return (
    <div className="relative flex min-h-full w-full items-center bg-primary-500">
      <div className="absolute left-0 top-0 h-full w-3/4 bg-white" />

      <div className="relative flex h-full w-full items-center justify-center gap-[20rem]">
        {/* 좌측 컨테이너 */}
        <div className="flex flex-col gap-12">
          <Modal text="회원가입" onClick={onConfirmSignUp} isExam={false} />
        </div>
        {/* 우측 컨테이너 */}
        <img src="/assets/images/home.png" alt="대문 이미지" className="h-auto w-[500px]" />
      </div>
    </div>
  );
};

export default SignUpPage;
