import OAuthButton from '@/components/signin/oauthbutton';
import { OAuthLogin } from '@/utils/authService';

const SignInPage = () => {
  return (
    <div
      className="relative flex h-full w-full justify-center pt-16"
      style={{
        background: `
          radial-gradient(circle at 50% 50%, rgb(255, 255, 255) 0%, transparent 100%),
          radial-gradient(circle at 50% 10%, rgb(186, 230, 253) 0%, transparent 30%),
          radial-gradient(circle at 80% 80%, rgb(227, 227, 255) 0%, transparent 50%),
          linear-gradient(180deg, rgb(219, 234, 254) 0%, rgb(255, 255, 255) 100%)
        `,
      }}
    >
      <div className="flex w-[500px] flex-col justify-center gap-10">
        <div className="flex pl-16">
          <div className="flex flex-col">
            <span className="text-2xl font-semibold">기술 면접 준비 보조 플랫폼</span>
            <span className="text-[80px] font-bold">Pull Up!</span>
          </div>
          <img src="/assets/images/logoIcon.png" alt="로고 아이콘" className="h-auto w-auto -translate-x-5" />
        </div>

        <div className="flex flex-col gap-4">
          <OAuthButton image="google" title="Google" onClick={() => OAuthLogin('google')} />
          <OAuthButton image="naver" title="Naver" onClick={() => OAuthLogin('naver')} />
          <OAuthButton image="kakao" title="Kakao" onClick={() => OAuthLogin('kakao')} />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
