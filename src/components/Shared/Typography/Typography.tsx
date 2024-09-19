import React, { FC, ReactNode } from 'react';
import styles from './Typography.module.scss';

interface TypographyProps {
  component: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  color?: 'primary' | 'secondary' | 'green';
  align?: 'left' | 'center';
  weight?: 'regular' | 'bold';
  noWrap?: boolean;
  children: ReactNode;
}

const Typography: FC<TypographyProps> = ({
  component,
  color = 'primary',
  align = 'left',
  weight = 'normal',
  noWrap = false,
  children,
}) => {
  const Component = component;
  
  const typographyClass = `
    ${styles.typography} 
    ${styles[`color--${color}`]} 
    ${styles[`align--${align}`]} 
    ${styles[`weight--${weight}`]} 
    ${noWrap ? styles['noWrap'] : ''}
  `;

  return (
    <Component className={typographyClass}>
      {children}
    </Component>
  );
};

export default Typography;
