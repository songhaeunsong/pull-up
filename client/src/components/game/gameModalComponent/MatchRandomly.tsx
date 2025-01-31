const MatchRandomly = () => {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex gap-4">
        <div className="rounded-lg bg-primary-500 p-10 text-primary-50 shadow-sm">1P</div>
        <div className="animate-pulse rounded-lg bg-stone-600 p-10 text-primary-50 shadow-sm">2P</div>
      </div>
      <span>2P를 찾고 있어요!</span>
    </div>
  );
};

export default MatchRandomly;
