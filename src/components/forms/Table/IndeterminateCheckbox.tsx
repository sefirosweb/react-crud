import React, { HTMLProps, useEffect, useRef } from 'react';

interface Props extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean;
}

export const IndeterminateCheckbox = (props: Props) => {
  const { indeterminate, ...rest } = props;
  const ref = useRef<HTMLInputElement>(null!);
  const { checked } = rest;

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !checked && indeterminate;
    }
  }, [ref, indeterminate, checked]);

  return <input type="checkbox" ref={ref} {...rest} />;
};
