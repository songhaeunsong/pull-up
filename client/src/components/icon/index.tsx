import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  id: string;
  size?: number;
}

const Icon = ({ id, size = 24, ...props }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <use ref={`/assets/icons/_sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
