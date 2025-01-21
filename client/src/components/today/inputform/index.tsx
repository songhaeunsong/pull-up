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
    <div className="flex h-[144px] w-full gap-4 rounded-xl border border-stone-400 bg-white pb-2 pl-4 pr-2 pt-4">
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="h-full flex-1 resize-none border-none text-lg placeholder:text-stone-400 focus:outline-none"
      ></textarea>
      <div className="flex h-full items-end gap-1">
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
