import useResponsive from '@/hooks/useResponsive';
import GameContainer from './gameContainer/gameContainer';
import MobileGameContainer from './gameContainer/MobileGameContainer';

const GamePage = () => {
  const { isMobile } = useResponsive();
  console.log(isMobile);
  return <div className="h-full w-full bg-white">{isMobile ? <MobileGameContainer /> : <GameContainer />}</div>;
};

export default GamePage;
