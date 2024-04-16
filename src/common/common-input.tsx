import { Field } from 'formik';
import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface CommonInputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  height: number;
  hasSuffixInput: boolean;
}

const StyledInput = styled.input<CommonInputProps>`
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

const Container = styled.div<Pick<CommonInputProps, 'height' | 'width'>>`
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
    background-color: #657786;
    opacity: 0.7;
    color: white;
  }
`;

export function CommonInput({ children, ...args }: CommonInputProps) {
  // TODO: 예외처리 추가

  const { name } = args;

  return (
    <Container {...args}>
      <StyledInput {...args} />
      {children}
    </Container>
  );
}
