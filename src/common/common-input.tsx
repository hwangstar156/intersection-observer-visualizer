import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface RangeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  height: number;
  suffix?: string;
}

const StyledInput = styled.input<RangeInputProps>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  background: white;
  outline: none;
  border-radius: 6px;
  height: ${({ height }) => (height ? `${height}px` : '10px')};
  padding-left: 5px;
  border: 1px solid transparent;

  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 1);

  :focus {
    outline: none;
  }
`;

const Container = styled.div<Pick<RangeInputProps, 'suffix'>>`
  position: relative;
  display: inline-block;
  width: 100%;
  margin-top: 2.4rem;
  padding: 0 1.2rem;
  font-size: 14px;

  &::after {
    overflow: hidden;
    position: relative;
    right: 1.2rem;
    transition: all 0.05s ease-in-out;
    content: '${({ suffix }) => (suffix ? suffix : '')}';
  }
`;

export function CommonInput({ ...args }: RangeInputProps) {
  // TODO: 예외처리 추가
  const { suffix } = args;

  return (
    <Container suffix={suffix}>
      <StyledInput {...args} />
    </Container>
  );
}
