const SignUp = () => {
  return (
    <div className="relative h-full w-full bg-primary-500">
      <div className="absolute left-0 top-0 h-full w-3/4 bg-white" />

      <div className="relative flex h-full w-full items-center justify-center gap-[20rem]">
        {/* 좌측 컨테이너 */}
        <div className="flex flex-col gap-12"></div>
        {/* 우측 컨테이너 */}
        <img src="/assets/images/home.png" alt="대문 이미지" className="h-auto w-[500px]" />
      </div>
    </div>
  );
};

export default SignUp;
