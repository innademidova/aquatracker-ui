import React from 'react';
import * as Icons from '../../assets/icons';
interface IconProps {
  glyph: keyof typeof Icons;
  className?: string;
  width?: number;
  height?: number;
}

const Icon: React.FC<IconProps> = ({ glyph, className, width = 24, height = 24 }) => {
  const SelectedIcon = Icons[glyph as keyof typeof Icons];

  if (!SelectedIcon) {
    return null;
  }

  return <SelectedIcon className={className} width={width} height={height} />;
};

export default Icon;
