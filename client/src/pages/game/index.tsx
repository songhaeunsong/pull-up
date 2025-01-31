import Modal from '@/components/common/modal';
import CreateRoom from '@/components/game/gameModalComponent/CreateRoom';
import InputCode from '@/components/game/gameModalComponent/InputCode';
import MatchRandomly from '@/components/game/gameModalComponent/MatchRandomly';

const GamePage = () => {
  return (
    <div className="grid h-full w-full grid-cols-[1.3fr_1fr] items-center justify-center bg-Main">
      <div className="flex justify-end">
        <div>
          <div className="w-20">
            <img src="/assets/images/card.png" alt="card" />
          </div>
          <div className="flex flex-col items-center gap-6">
            <h3 className="text-6xl font-extrabold">카드게임으로 공부하기</h3>
            <div className="flex gap-6">
              <Modal triggerName="랜덤 매칭" triggerColor="primary">
                <MatchRandomly />
              </Modal>
              <Modal triggerName="방 생성" triggerColor="primary">
                <CreateRoom />
              </Modal>
              <Modal triggerName="코드 입력" triggerColor="primary">
                <InputCode />
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full justify-end overflow-hidden">
        <div className="flex aspect-square h-[120vh] translate-x-[30vw] translate-y-[-40vh] transform items-center justify-center rounded-full bg-primary-500">
          <div className="aspect-square w-[60%] rounded-full bg-Main"></div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
