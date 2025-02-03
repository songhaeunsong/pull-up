import { useMediaQuery } from 'react-responsive';

const useIsMobile = () => {
  return useMediaQuery({ query: '(max-width: 640px)' });
};

export default useIsMobile;
