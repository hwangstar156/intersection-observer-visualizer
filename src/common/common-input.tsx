import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { SELECT_UNIT_LIST } from '../manager/observer-option-form/constants';

interface RangeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  height: number;
  suffix?: (typeof SELECT_UNIT_LIST)[number];
}

const StyledInput = styled.input<RangeInputProps>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  background: white;
  outline: none;
  border-radius: 6px;
  height: ${({ height }) => (height ? `${height}px` : '10px')};
  padding-left: 5px;
  border: 1px solid transparent;

  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.4);

  :focus {
    outline: none;
  }
`;

const Container = styled.div<Pick<RangeInputProps, 'suffix' | 'height'>>`
  position: relative;
  display: inline-block;
  font-size: 14px;

  &::after {
    overflow: hidden;
    position: absolute;
    top: ${({ height }) => `${(height - 21) / 2}px`};
    right: 0.5rem;
    transition: all 0.05s ease-in-out;
    content: '${({ suffix }) => (suffix ? suffix : '')}';
  }
`;

export function CommonInput({ ...args }: RangeInputProps) {
  // TODO: 예외처리 추가

  return (
    <Container {...args}>
      <StyledInput {...args} />
    </Container>
  );
}
