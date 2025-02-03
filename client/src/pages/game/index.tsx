import useIsMobile from '@/hooks/useIsMobile';
import GameContainer from './gameContainer/gameContainer';
import MobileGameContainer from './gameContainer/MobileGameContainer';

const GamePage = () => {
  const isMobile = useIsMobile();
  return <div className="h-full w-full bg-white">{isMobile ? <MobileGameContainer /> : <GameContainer />}</div>;
};

export default GamePage;
