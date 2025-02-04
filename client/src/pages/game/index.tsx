import useResponsive from '@/hooks/useResponsive';

import MobileGameContainer from './gameContainer/MobileGameContainer';
import GameContainer from './gameContainer/GameContainer';

const GamePage = () => {
  const { isTabletMd, isMobile } = useResponsive();
  return (
    <div className="h-full w-full bg-white">{isTabletMd || isMobile ? <MobileGameContainer /> : <GameContainer />}</div>
  );
};

export default GamePage;
