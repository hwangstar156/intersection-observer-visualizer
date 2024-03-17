import { useFormikContext } from 'formik';
import { useState, ChangeEvent } from 'react';
import { FormikValue } from '../left-navigation-bar';
import { NUMERIC_UNIT_LIST, SELECT_UNIT_LIST } from './constants';

export function useRootMarginInput({ name }: { name: keyof FormikValue }) {
  const [currentNumbericUnit, setCurrentNumbericUnit] =
    useState<(typeof NUMERIC_UNIT_LIST)[number]>(10);
  const { values, setFieldValue } = useFormikContext<FormikValue>();

  const isUnitValue = (value: number): value is (typeof NUMERIC_UNIT_LIST)[number] => {
    return NUMERIC_UNIT_LIST.some((unit) => unit === value);
  };

  const resetInput = () => {
    setFieldValue(name, { ...values[name], value: 0 });
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

    if (!value) {
      setFieldValue(name, { ...values[name], value: 0 });
      return;
    }

    if (limitValue > Number(value)) {
      setFieldValue(name, { ...values[name], value: parseInt(value, 10) });
    }
  };

  return {
    values,
    handleChangeRangeInput,
    handleChangeNumericUnit,
    currentNumbericUnit,
  };
}

export function useSelectValue({ name }: { name: keyof FormikValue }) {
  const { values, setFieldValue } = useFormikContext<FormikValue>();

  const isUnitValue = (value: string): value is (typeof SELECT_UNIT_LIST)[number] => {
    return SELECT_UNIT_LIST.some((unit) => unit === value);
  };

  const handleChangeUnit = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (isUnitValue(value)) {
      setFieldValue(name, { ...values[name], cssLengthUnit: value });
    }
  };

  return { selectValue: values, handleChangeUnit };
}
