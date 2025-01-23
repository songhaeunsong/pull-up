import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
const InputCode = () => {
  return (
    <div className="flex w-full max-w-sm items-center gap-2 space-x-2">
      <Input type="text" placeholder="친구에게 받은 코드를 입력하세요" />
      <Link to="/game/1">
        <Button type="submit">입장</Button>
      </Link>
    </div>
  );
};

export default InputCode;
