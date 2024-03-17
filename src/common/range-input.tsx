import { FormEvent, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface RangeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  barColor: string;
  backgroundColor: string;
  buttonSize: number;
  width?: number;
  height: number;
}

const StyledRangeInput = styled.input.attrs({ type: 'range' })<
  RangeInputProps & {
    initialPercent: number;
  }
>`
  width: ${({ width }) => (width ? width : '100%')};
  -webkit-appearance: none;
  background: white;
  outline: none;
  border-radius: 6px;
  height: ${({ height }) => (height ? `${height}px` : '4px')};
  background: ${({ initialPercent, barColor, backgroundColor }) =>
    `linear-gradient(to right, ${barColor} 0%, ${barColor} ${initialPercent}%, ${backgroundColor} ${initialPercent}%, ${backgroundColor} 100%);`};

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: white;
    cursor: pointer;
    height: ${({ buttonSize }) => `${buttonSize}px`};
    width: ${({ buttonSize }) => `${buttonSize}px`};
    margin-top: -7px;
    box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 1);

    border-radius: 50%;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 5px;
  }

  :focus {
    outline: none;
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
`;

export function RangeInput({ ...args }: RangeInputProps) {
  const { max, min, value } = args;

  const handleRangeInput = (event: FormEvent) => {
    const target = event.target as HTMLInputElement | null;

    if (!target) {
      return;
    }

    const percent =
      ((Number(target.value) - Number(target.min)) / (Number(target.max) - Number(target.min))) *
      100;

    target.style.background = `linear-gradient(to right, ${theme.colors.primary}, 0%, ${theme.colors.primary} ${percent}%, rgb(236, 236, 236) , ${percent}%, rgb(236, 236, 236) 100%)`;
  };

  const intialPercent = ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100;

  return (
    <Container>
      <StyledRangeInput onChange={handleRangeInput} {...args} initialPercent={intialPercent} />
    </Container>
  );
}
