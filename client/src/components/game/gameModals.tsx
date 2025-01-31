import { useGetProblem, usePostCreateGame } from '@/api/game';
import Modal from '../common/modal';
import CreateRoom from './gameModalComponent/CreateRoom';
import JoinGame from './gameModalComponent/JoinGame';
import Waiting from './gameModalComponent/Waiting';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { RoomStatus } from '@/types/game';

const GameModals = () => {
  const [roomStatus, setRoomStatus] = useState<RoomStatus>('WAITING'); // 임시 (추후 웹소켓으로 대체)
  const navigate = useNavigate();

  const { data: problems } = useGetProblem(roomStatus);

  const postCreateGame = usePostCreateGame();
  //   const { roomStatus, roomInfo, setRoomInfo } = useWebSocket();
  const [isReady, setIsReady] = useState(false);

  const roomInfo = {
    roomId: 1234,
    player1P: { memberId: 1, name: '송하은', score: 0 },
    player2P: { memberId: 2, name: '정지안', score: 0 },
  }; // 웹소켓으로 대체

  const [code, setCode] = useState('');

  const sendMessage = (destination: string, payload: unknown) => {
    console.log(destination, payload);
  }; // 임시 (추후 웹소켓으로 대체)

  const [member, setMember] = useState({
    id: '1',
    name: '송하은',
    email: 'test1@test.test',
  });

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleCreateRoom = async () => {
    setIsReady(true);
    const { roomId } = await postCreateGame(member.id);
    console.log('게임 생성 성공:', roomId);
  };

  const handleJoinRoom = async () => {
    setIsReady(true);

    try {
      await sendMessage('/app/room/join', {
        roomId: code,
        playerId: member.id,
      });

      setTimeout(() => {
        setRoomStatus('READY');
      }, 2000); // // 임시 (추후 웹소켓으로 대체) => 없어도 되는 코드
    } catch {
      toast.error('입력하신 코드와 일치하는 방이 없습니다.', {
        position: 'bottom-center',
      });
      setIsReady(false);
    }
    setCode('');
  };

  const handleCloseModal = (isOpen: boolean) => {
    if (!isOpen) {
      setIsReady(false);
    }
  };

  useEffect(() => {
    if (roomStatus === 'READY' && problems) {
      navigate(`/game/${roomInfo.roomId}`);
    }
  }, [problems, roomStatus]);

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
        {isReady ? <Waiting text="친구가 입장하면 시작합니다." /> : <CreateRoom handleGameState={handleCreateRoom} />}
      </Modal>
      <Modal
        triggerName="코드 입력"
        triggerColor="primary"
        onOpenChange={(isOpen: boolean) => handleCloseModal(isOpen)}
      >
        {isReady ? (
          <Waiting text="입장 중..." />
        ) : (
          <JoinGame code={code} onCodeChange={handleCodeChange} handleGameState={handleJoinRoom} />
        )}
      </Modal>
    </div>
  );
};

export default GameModals;
