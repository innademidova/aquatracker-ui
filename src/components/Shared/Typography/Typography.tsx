import { FC, ReactNode } from 'react';
import styles from './Typography.module.scss';

interface TypographyProps {
  component: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  color?: 'primary' | 'secondary' | 'secondary50'  | 'secondary60' | 'green';
  align?: 'left' | 'center';
  weight?: 'regular' | 'bold';
  noWrap?: boolean;
  size?: number,
  lineHeight?: number;
  className?: string;
  children: ReactNode;
}

const Typography: FC<TypographyProps> = ({
  component,
  color = 'primary',
  align = 'left',
  weight = 'normal',
  size = 12,
  lineHeight = 24,
  noWrap = false,
  className,
  children,
}) => {
  const Component = component;
  
  const typographyClass = `
    ${styles.typography} 
    ${styles[`color--${color}`]} 
    ${styles[`weight--${weight}`]} 
    ${noWrap ? styles['noWrap'] : ''}
    ${className}
  `;

  return (
    <Component style={{fontSize: size + 'px',
      lineHeight: lineHeight + 'px',
      textAlign: align
    }} className={typographyClass}>
      {children}
    </Component>
  );
};

export default Typography;
