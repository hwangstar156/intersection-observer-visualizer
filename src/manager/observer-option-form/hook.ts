import { useState, ChangeEvent } from 'react';

export function useInput({ initialValue }: { initialValue: number }) {
  const [input, setInput] = useState(initialValue);

  const handleChangeRangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;

    setInput(value);
  };

  return { input, handleChangeRangeInput };
}
