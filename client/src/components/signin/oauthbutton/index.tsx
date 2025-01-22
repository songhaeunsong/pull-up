interface OAuthButtonProps {
  image: string;
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const OAuthButton = ({ image, title, onClick }: OAuthButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-4 rounded-full border border-stone-400 bg-white px-10 py-5"
    >
      <img src={`/assets/images/${image}.png`} alt={`${title} 로고`} className="aspect-square object-fill" width={28} />
      <span className="text-xl font-semibold">Sign in with {title}</span>
    </button>
  );
};

export default OAuthButton;
