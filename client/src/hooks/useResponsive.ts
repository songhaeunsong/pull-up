import { useMediaQuery } from 'react-responsive';

const useResponsive = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 639px)' });
  const isTabletMd = useMediaQuery({ query: '(min-width: 640px) and (max-width: 768px)' });
  const isTabletLg = useMediaQuery({ query: '(min-width: 769px) and (max-width: 1024px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

  return { isMobile, isTabletMd, isTabletLg, isDesktop };
};

export default useResponsive;
