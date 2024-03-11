import { LabelHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  font-size: 14px;
  color: white;
`;

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  width?: number;
  height: number;
}

export function Label({ children }: LabelProps) {
  return <StyledLabel>{children}</StyledLabel>;
}
