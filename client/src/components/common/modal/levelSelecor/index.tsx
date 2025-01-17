interface LevelSelectorProps {
  id: string;
  name: string;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const LevelSelecor = ({ id, name, isSelected, onClick }: LevelSelectorProps) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`text-lg flex flex-1 justify-center py-2 rounded-xl font-semibold border ${
        isSelected
          ? 'bg-primary-500 text-white border-primary-500' // 선택된 상태
          : 'text-primary-500 border-2 border-primary-500 hover:bg-primary-50'
      }`}
    >
      {name}
    </button>
  );
};

export default LevelSelecor;
