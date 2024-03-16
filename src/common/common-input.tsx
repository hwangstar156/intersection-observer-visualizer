import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { SELECT_UNIT_LIST } from '../manager/observer-option-form/constants';

interface RangeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  height: number;
  hasSuffixInput: boolean;
}

const StyledInput = styled.input<RangeInputProps>`
  outline: none;
  padding-left: 5px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  height: ${({ height }) => (height ? `${height}px` : '10px')};
  width: ${({ width, hasSuffixInput }) => {
    if (width && hasSuffixInput) {
      return `${width - 45}px`;
    }

    return `${width}px`;
  }};
  vertical-align: center;

  :focus {
    outline: none;
  }
`;

const Container = styled.div<Pick<RangeInputProps, 'height' | 'width'>>`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 13px;
  border-radius: 6px;
  background: white;
  height: ${({ height }) => (height ? `${height}px` : '10px')};
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.4);

  :disabled {
    background-color: ${({ theme }) => theme.colors.primary};
    opacity: 0.7;
  }
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
