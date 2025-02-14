import OAuthButton from '@/components/signin/oauthbutton';

const SignInPage = () => {
  return (
    <div
      className="relative flex h-full w-full justify-center pt-[94px] sm:pt-16"
      style={{
        background: `
          radial-gradient(circle at 50% 50%, rgb(255, 255, 255) 0%, transparent 100%),
          radial-gradient(circle at 50% 10%, rgb(186, 230, 253) 0%, transparent 30%),
          radial-gradient(circle at 80% 80%, rgb(227, 227, 255) 0%, transparent 50%),
          linear-gradient(180deg, rgb(219, 234, 254) 0%, rgb(255, 255, 255) 100%)
        `,
      }}
    >
      <div className="mx-6 flex w-[400px] flex-col justify-center gap-10 lg:w-[500px]">
        <div className="flex justify-center md:justify-start md:pl-20 lg:pl-16">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-lg font-semibold md:text-xl lg:text-2xl">기술 면접 준비 보조 플랫폼</span>
            <span className="text-5xl font-bold md:text-[60px] lg:text-[80px]">Pull Up!</span>
          </div>
          <img
            src="/assets/images/logoIcon.png"
            alt="로고 아이콘"
            className="hidden h-auto w-[100px] -translate-x-3 md:block lg:w-auto lg:-translate-x-5"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <OAuthButton image="google" title="Google" />
          <OAuthButton image="naver" title="Naver" />
          <OAuthButton image="kakao" title="Kakao" />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
