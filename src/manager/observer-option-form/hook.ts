import { useState, ChangeEvent } from 'react';
import { SELECT_UNIT_LIST } from './constants';

export function useInput({ initialValue }: { initialValue: number }) {
  const [input, setInput] = useState(initialValue);

  const handleChangeRangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;

    setInput(value);
  };

  return { input, handleChangeRangeInput };
}

const isUnitValue = (value: string): value is (typeof SELECT_UNIT_LIST)[number] => {
  return SELECT_UNIT_LIST.some((unit) => unit === value);
};

export function useSelectValue() {
  const [currentUnit, setCurrentUnit] = useState<(typeof SELECT_UNIT_LIST)[number]>('px');

  const handleChangeUnit = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (isUnitValue(value)) {
      setCurrentUnit(value);
    }
  };

  return { currentUnit, handleChangeUnit };
}
