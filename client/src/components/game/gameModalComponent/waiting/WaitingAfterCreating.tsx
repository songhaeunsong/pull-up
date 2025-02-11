import { Button } from '@/components/ui/button';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { throttle } from 'lodash';
import { useRoomStore } from '@/stores/roomStore';

const WaitingAfterCreating = () => {
  const { roomId } = useRoomStore();

  const handleClipboard = useCallback(
    throttle(
      async () => {
        await navigator.clipboard.writeText(roomId);
        toast.success('코드가 복사되었습니다!', { position: 'bottom-center' });
      },
      3000,
      { leading: true, trailing: false },
    ),
    [roomId],
  );

  useEffect(() => {
    if (roomId.length) handleClipboard();
  }, [roomId]);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span className="font-bold">코드를 복사해 친구에게 공유해주세요!</span>
      <div className="flex items-center justify-center gap-3">
        <div className="rounded-xl bg-primary-50 px-4 py-2">{roomId}</div>
        <Button onClick={handleClipboard}>복사</Button>
      </div>
    </div>
  );
};

export default WaitingAfterCreating;
