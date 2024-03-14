import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { SELECT_UNIT_LIST } from '../manager/observer-option-form/constants';
import { CssLengthUnit } from '../manager/observer-option-form/css-length-unit';

interface RangeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  height: number;
  suffix?: (typeof SELECT_UNIT_LIST)[number];
}

const StyledInput = styled.input<RangeInputProps>`
  outline: none;
  padding-left: 5px;
  border: 1px solid transparent;
  background: transparent;
  height: ${({ height }) => (height ? `${height}px` : '10px')};
  width: ${({ width }) => (width ? `${width - 45}px` : '100%')};
  vertical-align: center;

  :focus {
    outline: none;
  }
`;

const Container = styled.div<Pick<RangeInputProps, 'suffix' | 'height' | 'width'>>`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 13px;
  border-radius: 6px;
  background: white;
  height: ${({ height }) => (height ? `${height}px` : '10px')};
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.4);

  /* &::after {
    overflow: hidden;
    position: absolute;
    top: ${({ height }) => `${(height - 21) / 2}px`};
    right: 0.5rem;
    transition: all 0.05s ease-in-out;
    content: '${({ suffix }) => (suffix ? suffix : '')}';
  } */
`;

export function CommonInput({ children, ...args }: RangeInputProps) {
  // TODO: 예외처리 추가

  return (
    <Container {...args}>
      <StyledInput {...args} />
      {children}
    </Container>
  );
}
