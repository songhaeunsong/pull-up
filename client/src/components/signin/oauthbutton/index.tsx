import { Link } from 'react-router-dom';

interface OAuthButtonProps {
  image: string;
  title: string;
}

const OAuthButton = ({ image, title }: OAuthButtonProps) => {
  return (
    <Link
      to={
        import.meta.env.VITE_MOCK_SERVICE === 'develop'
          ? '/redirect'
          : `${import.meta.env.VITE_OAUTH_URL}/oauth2/authorization/${title.toLocaleLowerCase()}`
      }
      className="flex w-fit items-center justify-center gap-4 rounded-full border border-stone-400 bg-white px-10 py-3 md:w-full md:py-4 lg:py-5"
    >
      <img
        src={`/assets/images/${image}.png`}
        alt={`${title} 로고`}
        className="aspect-square object-fill md:w-6 lg:w-7"
        width={20}
      />
      <span className="font-semibold md:text-lg lg:text-xl">Sign in with {title}</span>
    </Link>
  );
};

export default OAuthButton;
