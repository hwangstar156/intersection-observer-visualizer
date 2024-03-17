import styled from 'styled-components';
import { CommonInput } from '../../common/common-input';
import { CssLengthUnit } from './css-length-unit';
import { useRootMarginInput, useSelectValue, useThresholdInput } from './hook';
import { NumericUnitSelect } from './numeric-unit-select';
import { Range } from './range';

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface InputProps {
  initialValue: number;
  width: number;
  height: number;
}

export function ThresholdInput({ initialValue, width, height }: InputProps) {
  const { handleChangeRangeInput, input } = useThresholdInput({
    initialValue,
  });

  return (
    <>
      <Range min={0} max={1} step={0.1} value={input} onChange={handleChangeRangeInput} />
      <InputWrapper>
        <CommonInput
          width={width}
          height={height}
          type="text"
          value={input}
          disabled
          hasSuffixInput={false}
          onChange={handleChangeRangeInput}
        ></CommonInput>
      </InputWrapper>
    </>
  );
}

interface InputWithUnitProps extends InputProps {}

export function RootMarginInput({ initialValue, width, height }: InputWithUnitProps) {
  const { handleChangeRangeInput, input, currentNumbericUnit, handleChangeNumericUnit } =
    useRootMarginInput({
      initialValue,
    });
  const { currentUnit, handleChangeUnit } = useSelectValue();

  return (
    <>
      <Range
        min={-(currentNumbericUnit - 1)}
        max={currentNumbericUnit - 1}
        step={1}
        value={input}
        onChange={handleChangeRangeInput}
      />
      <InputWrapper>
        <CommonInput
          width={width}
          height={height}
          type="text"
          value={input}
          hasSuffixInput={true}
          onChange={handleChangeRangeInput}
        >
          <CssLengthUnit
            currentValue={currentUnit}
            onChange={handleChangeUnit}
            width={37}
            height={20}
          />
        </CommonInput>
        <NumericUnitSelect
          height={30}
          width={70}
          currentValue={currentNumbericUnit}
          onChange={handleChangeNumericUnit}
        />
      </InputWrapper>
    </>
  );
}
