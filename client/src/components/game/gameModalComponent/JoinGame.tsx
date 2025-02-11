import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormFormEvent, InputChangeEvent } from '@/types/event';

interface InputCodeProps {
  code: string;
  onCodeChange: (value: string) => void;
  handleGameState: (event: FormFormEvent) => void;
}
const JoinGame = ({ code, onCodeChange, handleGameState }: InputCodeProps) => {
  const handleChangeCode = (e: InputChangeEvent) => {
    onCodeChange(e.target.value);
  };

  return (
    <form onSubmit={handleGameState} className="flex w-full max-w-sm items-center gap-2 space-x-2">
      <Input type="text" placeholder="친구에게 받은 코드를 입력하세요" value={code} onChange={handleChangeCode} />
      <Button type="submit">입장</Button>
    </form>
  );
};

export default JoinGame;
