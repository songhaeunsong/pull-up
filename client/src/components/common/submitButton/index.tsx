interface SubmitButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  color?: 'primary' | 'secondary' | 'gray';
  disabled?: boolean;
}

const SubmitButton = ({ onClick, text, color = 'primary', disabled = false }: SubmitButtonProps) => {
  const COLOR_PROPS = {
    primary: 'bg-primary-500 text-white',
    secondary: 'bg-secondary-500 text-white',
    gray: 'bg-gray-100 text-gray-500',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${COLOR_PROPS[color]} w-full rounded-xl py-5 text-xl font-semibold`}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
