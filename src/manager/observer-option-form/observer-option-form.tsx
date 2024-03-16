import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { CommonInput } from '../../common/common-input';
import { Label } from '../../common/label';
import { CssLengthUnit } from './css-length-unit';
import { useInput, useSelectValue, useThresholdInput } from './hook';
import { Input } from './input';
import { NumericUnitSelect } from './numeric-unit-select';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.3rem;
  gap: 9px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface ObserverOptionFormProps {
  initialValue: number;
  label: string;
}

export function ObserverOptionForm({ label, initialValue }: ObserverOptionFormProps) {
  const { handleChangeRangeInput, input, currentNumbericUnit, handleChangeNumericUnit } = useInput({
    initialValue,
  });
  const { currentUnit, handleChangeUnit } = useSelectValue();

  return (
    <Container>
      <Label fontSize={15}>{label}</Label>
      <Input
        min={-(currentNumbericUnit - 1)}
        max={currentNumbericUnit - 1}
        step={1}
        value={input}
        onChange={handleChangeRangeInput}
      />
      <InputWrapper>
        <CommonInput
          width={90}
          height={30}
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
    </Container>
  );
}

export function ThresholdOptionForm({ label, initialValue }: ObserverOptionFormProps) {
  const { handleChangeRangeInput, input } = useThresholdInput({
    initialValue,
  });

  return (
    <Container>
      <Label fontSize={15}>{label}</Label>
      <Input min={0} max={1} step={0.1} value={input} onChange={handleChangeRangeInput} />
      <InputWrapper>
        <CommonInput
          width={35}
          height={30}
          type="text"
          value={input}
          disabled
          hasSuffixInput={false}
          onChange={handleChangeRangeInput}
        ></CommonInput>
      </InputWrapper>
    </Container>
  );
}

Object.assign(ObserverOptionForm, {});
