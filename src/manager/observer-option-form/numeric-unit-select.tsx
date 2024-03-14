import { ChangeEvent, Fragment, SelectHTMLAttributes } from 'react';
import styled from 'styled-components';
import { NUMERIC_UNIT_LIST } from './constants';

const StyledSelect = styled.select<Omit<SelectProps, 'onChange' | 'currentValue'>>`
  background-color: #666;
  color: white;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid transparent;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => height && `${height}px`};
  font-size: 12px;

  &:focus {
    outline: none;
  }
`;

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  width?: number;
  height: number;
  suffix?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  currentValue: (typeof NUMERIC_UNIT_LIST)[number];
}

export function NumericUnitSelect({ currentValue, onChange, ...args }: SelectProps) {
  return (
    <StyledSelect name="optionUnit" onChange={onChange} {...args} value={currentValue}>
      {NUMERIC_UNIT_LIST.map((unit) => (
        <option value={unit} key={unit}>
          {unit}
        </option>
      ))}
    </StyledSelect>
  );
}
