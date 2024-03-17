import { LabelHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label<{ fontSize: number; color?: string }>`
  color: ${({ color }) => (color ? color : '#cdcdcd')};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
`;

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  fontSize: number;
  color?: string;
}

export function Label({ children, ...args }: LabelProps) {
  return <StyledLabel {...args}>{children}</StyledLabel>;
}
