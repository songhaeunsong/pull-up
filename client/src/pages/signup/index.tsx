import CsConditionSelector from '@/components/common/csConditionSelector';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const onConfirmSignUp = () => {
    navigate('/interview');
  };

  return (
    <div
      className="relative flex h-full w-full items-center pt-[94px] sm:pt-16"
      style={{
        background: `
        radial-gradient(circle at 50% 50%, rgb(255, 255, 255) 0%, transparent 100%),
        radial-gradient(circle at 50% 10%, rgb(186, 230, 253) 0%, transparent 30%),
        radial-gradient(circle at 80% 80%, rgb(227, 227, 255) 0%, transparent 50%),
        linear-gradient(180deg, rgb(219, 234, 254) 0%, rgb(255, 255, 255) 100%)
      `,
      }}
    >
      <div className="relative flex h-full w-full items-center justify-around lg:p-10 xl:p-20">
        {/* 좌측 컨테이너 */}
        <div className="flex flex-col gap-12">
          <CsConditionSelector title="관심 과목 선택" text="회원가입" onClick={onConfirmSignUp} />
        </div>
        {/* 우측 컨테이너 */}
        <img
          src="/assets/images/exam1.png"
          alt="대문 이미지"
          className="hidden h-auto w-[400px] lg:block xl:w-[600px]"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
