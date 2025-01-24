interface LevelSelectorProps {
  id: string;
  name: string;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const LevelSelector = ({ id, name, isSelected, onClick }: LevelSelectorProps) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex flex-1 justify-center rounded-xl border py-1 text-lg font-semibold ${
        isSelected
          ? 'border-primary-500 bg-primary-500 text-white' // 선택된 상태
          : 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50'
      }`}
    >
      {name}
    </button>
  );
};

export default LevelSelector;
