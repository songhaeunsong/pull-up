import Icon from '@/components/common/icon';

interface InputFormProps {
  id: string;
  placeholder: string;
  value: string;
  limit?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const InputForm = ({ id, placeholder, value, limit, onChange, onSubmit, onKeyDown }: InputFormProps) => {
  return (
    <div className="flex border border-stone-400 pl-4 pt-4 pr-2 pb-2 rounded-xl w-full gap-4 h-[144px]">
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="flex-1 h-full resize-none border-none focus:outline-none text-lg placeholder:text-stone-400"
      ></textarea>
      <div className="flex items-end gap-1 h-full">
        {limit ? (
          <div className="text-lg font-semibold">
            <span className="text-primary-500">{`${value.length}`}</span>
            <span className="text-stone-900">{`/${limit}`}</span>
          </div>
        ) : (
          <></>
        )}
        <button onClick={onSubmit}>
          {limit ? <Icon id="upload-black" size={48} /> : <Icon id="upload-gray" size={48} />}
        </button>
      </div>
    </div>
  );
};

export default InputForm;
