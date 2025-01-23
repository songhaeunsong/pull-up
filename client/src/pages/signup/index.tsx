import Modal from '@/components/common/csConditionSelector/temp';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const onConfirmSignUp = () => {
    navigate('/today');
  };

  return (
    <div
      className="relative flex min-h-full w-full items-center"
      style={{
        background: `
        radial-gradient(circle at 50% 50%, rgb(255, 255, 255) 0%, transparent 100%),
        radial-gradient(circle at 50% 10%, rgb(186, 230, 253) 0%, transparent 30%),
        radial-gradient(circle at 80% 80%, rgb(227, 227, 255) 0%, transparent 50%),
        linear-gradient(180deg, rgb(219, 234, 254) 0%, rgb(255, 255, 255) 100%)
      `,
      }}
    >
      <div className="relative flex h-full w-full items-center justify-center gap-[20rem]">
        {/* 좌측 컨테이너 */}
        <div className="flex flex-col gap-12">
          <Modal text="회원가입" onClick={onConfirmSignUp} isExam={false} />
        </div>
        {/* 우측 컨테이너 */}
        <img src="/assets/images/exam1.png" alt="대문 이미지" className="h-auto w-[600px]" />
      </div>
    </div>
  );
};

export default SignUpPage;
