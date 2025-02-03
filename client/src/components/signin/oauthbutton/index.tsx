interface OAuthButtonProps {
  image: string;
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const OAuthButton = ({ image, title, onClick }: OAuthButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex w-fit items-center justify-center gap-4 rounded-full border border-stone-400 bg-white px-10 py-3 md:w-full md:py-4 lg:py-5"
    >
      <img
        src={`/assets/images/${image}.png`}
        alt={`${title} 로고`}
        className="aspect-square object-fill md:w-6 lg:w-7"
        width={20}
      />
      <span className="font-semibold md:text-lg lg:text-xl">Sign in with {title}</span>
    </button>
  );
};

export default OAuthButton;
