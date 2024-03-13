import React, { ChangeEvent, useState } from 'react';
import { RangeInput } from '../../common/range-input';
import { theme } from '../../styles/theme';

interface InputProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ max, min, step, onChange, value }: InputProps) {
  return (
    <RangeInput
      min={min}
      max={max}
      step={step}
      value={value}
      backgroundColor={'#fff'}
      barColor={theme.colors.primary}
      buttonSize={20}
      height={4}
      onChange={onChange}
    />
  );
}
