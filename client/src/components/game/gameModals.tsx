import { useGetProblem, usePostCreateGame } from '@/api/game';
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

  const { roomStatus, roomInfo, sendMessage } = useWebSocket();

  const { data: problems } = useGetProblem(roomStatus);
  const postCreateGame = usePostCreateGame();

  const [isReady, setIsReady] = useState(false);

  const [codeForInviting, setCodeForInviting] = useState('');
  const [codeForJoinning, setCodeForJoinning] = useState('');

  const [member1, setMember1] = useState({
    id: '2',
    name: '송하은',
    email: 'test1@test.test',
  }); // 더미 데이터

  const [member2, setMember2] = useState({
    id: '3',
    name: '정지안',
    email: 'test2@test.test',
  }); // 더미 데이터

  const createRoomTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const joinRoomTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const createRoomTimeout = () => {
    createRoomTimeoutRef.current = setTimeout(() => {
      if (roomStatus !== 'READY') {
        toast.error('방을 다시 만들어주세요!', {
          position: 'bottom-center',
        });
        setIsReady(false);
      }
    }, 1000 * 60);
  };

  const joinRoomTimeout = () => {
    joinRoomTimeoutRef.current = setTimeout(() => {
      if (roomStatus !== 'READY') {
        toast.error('코드와 일치하는 방이 없습니다.', {
          position: 'bottom-center',
        });
        setIsReady(false);
      }
    }, 3000);
  };

  const handleCodeChange = (newCode: string) => {
    setCodeForJoinning(newCode);
  };

  const handleCreateRoom = async () => {
    setIsReady(true);
    const { roomId } = await postCreateGame(member1.id); // member.id 제거 예정
    setCodeForInviting(roomId);

    createRoomTimeout();
  };

  const handleJoinRoom = async () => {
    setIsReady(true);

    sendMessage('/app/room/join', {
      roomId: codeForJoinning,
      playerId: member2.id,
    });

    setCodeForJoinning('');

    joinRoomTimeout();
  };

  useEffect(() => {
    if (roomStatus === 'READY' && problems) {
      if (createRoomTimeoutRef.current) {
        clearTimeout(createRoomTimeoutRef.current);
      }
      if (joinRoomTimeoutRef.current) {
        clearTimeout(joinRoomTimeoutRef.current);
      }

      setTimeout(() => {
        navigate(`/game/${roomInfo.roomId}`);
      }, 3000);
    }
  }, [problems, roomStatus]);

  const handleCloseModal = (isOpen: boolean) => {
    if (!isOpen) {
      if (createRoomTimeoutRef.current) {
        clearTimeout(createRoomTimeoutRef.current);
      }
      if (joinRoomTimeoutRef.current) {
        clearTimeout(joinRoomTimeoutRef.current);
      }

      setIsReady(false);
    }
  };

  return (
    <div className="flex gap-6">
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
