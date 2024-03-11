import { LabelHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label<{ fontSize: number }>`
  font-size: 14px;
  color: white;
  font-size: ${({ fontSize }) => `${fontSize}px`};
`;

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  width?: number;
  height: number;
  fontSize: number;
}

export function Label({ children, ...args }: LabelProps) {
  return <StyledLabel {...args}>{children}</StyledLabel>;
}
