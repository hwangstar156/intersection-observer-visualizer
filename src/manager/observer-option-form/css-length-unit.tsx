import { ChangeEvent, SelectHTMLAttributes } from 'react';
import styled from 'styled-components';
import { SELECT_UNIT_LIST } from './constants';

const StyledSelect = styled.select<Pick<CssLengthUnitProps, 'width' | 'height'>>`
  background-color: #dedede;
  border-radius: 6px;
  border: 1px solid transparent;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => height && `${height}px`};
  font-size: 12px;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

interface CssLengthUnitProps extends SelectHTMLAttributes<HTMLSelectElement> {
  width?: number;
  height: number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  currentValue: (typeof SELECT_UNIT_LIST)[number];
}

export function CssLengthUnit({ currentValue, onChange, ...args }: CssLengthUnitProps) {
  return (
    <StyledSelect name="cssLengthUnit" onChange={onChange} value={currentValue} {...args}>
      {SELECT_UNIT_LIST.map((unit) => (
        <option value={unit} key={unit}>
          {unit}
        </option>
      ))}
    </StyledSelect>
  );
}
