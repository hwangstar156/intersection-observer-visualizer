import { useState, ChangeEvent } from 'react';
import { NUMERIC_UNIT_LIST, SELECT_UNIT_LIST } from './constants';

export function useInput({ initialValue }: { initialValue: number }) {
  const [input, setInput] = useState(initialValue);
  const [currentNumbericUnit, setCurrentNumbericUnit] =
    useState<(typeof NUMERIC_UNIT_LIST)[number]>(10);

  const isUnitValue = (value: number): value is (typeof NUMERIC_UNIT_LIST)[number] => {
    return NUMERIC_UNIT_LIST.some((unit) => unit === value);
  };

  const resetInput = () => {
    setInput(0);
  };

  const handleChangeNumericUnit = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);

    if (isUnitValue(value)) {
      setCurrentNumbericUnit(value);

      resetInput();
    }
  };

  const handleChangeRangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const limitValue = currentNumbericUnit;

    if (limitValue > Number(value)) {
      setInput(parseInt(value, 10));
    }
  };

  return {
    input,
    handleChangeRangeInput,
    handleChangeNumericUnit,
    currentNumbericUnit,
  };
}

export function useSelectValue() {
  const [currentUnit, setCurrentUnit] = useState<(typeof SELECT_UNIT_LIST)[number]>('px');

  const isUnitValue = (value: string): value is (typeof SELECT_UNIT_LIST)[number] => {
    return SELECT_UNIT_LIST.some((unit) => unit === value);
  };

  const handleChangeUnit = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (isUnitValue(value)) {
      setCurrentUnit(value);
    }
  };

  return { currentUnit, handleChangeUnit };
}

export function useThresholdInput({ initialValue }: { initialValue: number }) {
  const [input, setInput] = useState(initialValue);

  const handleChangeRangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;

    setInput(value);
  };

  return {
    input,
    handleChangeRangeInput,
  };
}
