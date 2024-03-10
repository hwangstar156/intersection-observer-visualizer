import { ChangeEvent, useState } from 'react';
import { RangeInput } from '../../common/range-input';
import { theme } from '../../styles/theme';

interface InputProps {
  initialValue: number;
  min: number;
  max: number;
  step: number;
}

export function Input({ initialValue, max, min, step }: InputProps) {
  const { handleChangeRangeInput, input } = useInput({ initialValue });

  return (
    <RangeInput
      min={min}
      max={max}
      step={step}
      value={input}
      backgroundColor={'#fff'}
      barColor={theme.colors.primary}
      buttonSize={20}
      height={4}
      onChange={handleChangeRangeInput}
    />
  );
}

function useInput({ initialValue }: Pick<InputProps, 'initialValue'>) {
  const [input, setInput] = useState(initialValue);

  const handleChangeRangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;

    setInput(value);
  };

  return { input, handleChangeRangeInput };
}
