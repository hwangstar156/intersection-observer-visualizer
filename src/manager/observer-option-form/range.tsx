import { Field } from 'formik';
import React from 'react';
import { RangeInput } from '../../common/range-input';
import { theme } from '../../styles/theme';

interface RangeProps {
  min: number;
  max: number;
  step: number;
  value: number;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Range({ max, min, step, onChange, value, name }: RangeProps) {
  return (
    <Field name={name}>
      {() => {
        return (
          <RangeInput
            min={min}
            max={max}
            step={step}
            value={value}
            backgroundColor={'#fff'}
            barColor={theme.colors.primary}
            buttonSize={20}
            height={5}
            onChange={onChange}
          />
        );
      }}
    </Field>
  );
}
