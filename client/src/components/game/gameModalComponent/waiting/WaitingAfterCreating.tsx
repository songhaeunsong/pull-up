import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

const WaitingAfterCreating = ({ code }: { code: string }) => {
  const handleClipboard = async () => {
    await navigator.clipboard.writeText(code);
    toast.success('코드가 복사되었습니다!', {
      position: 'bottom-center',
    });
  };
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span className="font-bold">코드를 복사해 친구에게 공유해주세요!</span>
      <div className="flex items-center justify-center gap-3">
        <div className="rounded-xl bg-primary-50 px-4 py-2">{code}</div>
        <Button onClick={handleClipboard}>복사</Button>
      </div>
    </div>
  );
};

export default WaitingAfterCreating;
