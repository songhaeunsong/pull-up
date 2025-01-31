import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputChangeEvent } from '@/types/event';

interface InputCodeProps {
  code: string;
  onCodeChange: (value: string) => void;
  handleGameState: () => void;
}
const JoinGame = ({ code, onCodeChange, handleGameState }: InputCodeProps) => {
  const handleChangeCode = (e: InputChangeEvent) => {
    onCodeChange(e.target.value);
  };

  return (
    <div className="flex w-full max-w-sm items-center gap-2 space-x-2">
      <Input type="text" placeholder="친구에게 받은 코드를 입력하세요" value={code} onChange={handleChangeCode} />
      <Button type="submit" onClick={handleGameState}>
        입장
      </Button>
    </div>
  );
};

export default JoinGame;
