import { usePostCreateGame, usePostJoinGame } from '@/api/game';
import Modal from '../common/modal';
import CreateRoom from './gameModalComponent/CreateRoom';
import JoinGame from './gameModalComponent/JoinGame';
import Waiting from './gameModalComponent/waiting/Waiting';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebSocket from '@/hooks/useWebSocket';
import WaitingAfterCreating from './gameModalComponent/waiting/WaitingAfterCreating';
import { toast } from 'react-toastify';

const GameModals = () => {
  const navigate = useNavigate();

  const { roomStatus, roomInfo } = useWebSocket();

  const postCreateGame = usePostCreateGame();
  const postJoinGame = usePostJoinGame();

  const [isReady, setIsReady] = useState(false);

  const [codeForInviting, setCodeForInviting] = useState('');
  const [codeForJoinning, setCodeForJoinning] = useState('');

  const createRoomTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // const joinRoomTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const createRoomTimeout = () => {
    createRoomTimeoutRef.current = setTimeout(() => {
      if (roomStatus !== 'PLAYING') {
        toast.error('방을 다시 만들어주세요!', {
          position: 'bottom-center',
        });
        setIsReady(false);
      }
    }, 1000 * 60);
  };

  const handleCodeChange = (newCode: string) => {
    setCodeForJoinning(newCode);
  };

  const handleCreateRoom = async () => {
    setIsReady(true);
    const selects = {
      algorithm: true,
      computerArchitecture: true,
      database: true,
      dataStructure: false,
      network: true,
      operatingSystem: true,
    }; // 더미
    const { roomId } = await postCreateGame(selects);
    setCodeForInviting(roomId);

    createRoomTimeout();
  };

  const handleJoinRoom = async () => {
    setIsReady(true);

    const { isReady } = await postJoinGame(codeForJoinning);

    if (!isReady) {
      toast.error('코드와 일치하는 방이 없습니다.', {
        position: 'bottom-center',
      });
      setIsReady(false);
    }
    setCodeForJoinning('');
  };

  useEffect(() => {
    if (roomStatus === 'PLAYING') {
      if (createRoomTimeoutRef.current) {
        clearTimeout(createRoomTimeoutRef.current);
      }
      // if (joinRoomTimeoutRef.current) {
      //   clearTimeout(joinRoomTimeoutRef.current);
      // }

      setTimeout(() => {
        navigate(`/game/${roomInfo.roomId}`);
      }, 3000);
    }
  }, [navigate, roomInfo.roomId, roomStatus]);

  const handleCloseModal = (isOpen: boolean) => {
    if (!isOpen) {
      if (createRoomTimeoutRef.current) {
        clearTimeout(createRoomTimeoutRef.current);
      }
      // if (joinRoomTimeoutRef.current) {
      //   clearTimeout(joinRoomTimeoutRef.current);
      // }

      setIsReady(false);
    }
  };

  return (
    <div className="flex gap-4 sm:gap-6">
      <Modal
        triggerName="랜덤 매칭"
        triggerColor="primary"
        onOpenChange={(isOpen: boolean) => handleCloseModal(isOpen)}
      >
        <Waiting text="2P를 찾고 있어요!" />
      </Modal>
      <Modal triggerName="방 생성" triggerColor="primary" onOpenChange={(isOpen: boolean) => handleCloseModal(isOpen)}>
        {isReady ? <WaitingAfterCreating code={codeForInviting} /> : <CreateRoom handleGameState={handleCreateRoom} />}
      </Modal>
      <Modal
        triggerName="코드 입력"
        triggerColor="primary"
        onOpenChange={(isOpen: boolean) => handleCloseModal(isOpen)}
      >
        {isReady ? (
          <Waiting text="입장 중..." />
        ) : (
          <JoinGame code={codeForJoinning} onCodeChange={handleCodeChange} handleGameState={handleJoinRoom} />
        )}
      </Modal>
    </div>
  );
};

export default GameModals;
