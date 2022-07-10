import React, { HTMLAttributes, ReactNode } from 'react';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: 'primary' | 'secondary';
}

export function Button(props: Props) {
  const { children = 'primary', variant } = props;
  return (
    <button
      {...props}
      style={{ backgroundColor: variant === 'primary' ? 'blue' : 'red' }}
    >
      asd
      {children}
    </button>
  );
}
