import { InputHTMLAttributes, useEffect, useState } from 'react';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
}

export const DebouncedInput = (props: Props) => {
  const { value, onChange, debounce = 230 } = props;
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(currentValue);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [currentValue]);

  return (
    <input
      {...props}
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
    />
  );
}
