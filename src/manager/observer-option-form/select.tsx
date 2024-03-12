import { SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select<SelectProps>`
  background-color: #666;
  color: white;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid transparent;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => height && `${height}px`};
  font-size: 14px;

  &:focus {
    outline: none;
  }
`;

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  width?: number;
  height: number;
  suffix?: string;
}

export function Select({ ...args }: SelectProps) {
  return (
    <StyledSelect name="optionUnit" {...args}>
      <option value="%">as percent</option>
      <option value="px">as pixel</option>
    </StyledSelect>
  );
}
