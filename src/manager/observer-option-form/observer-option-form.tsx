import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { CommonInput } from '../../common/common-input';
import { Label } from '../../common/label';
import { CssLengthUnit } from './css-length-unit';
import { useInput, useNumericUnitSelectValue, useSelectValue } from './hook';
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
}

export function ObserverOptionForm({ initialValue }: ObserverOptionFormProps) {
  const { handleChangeRangeInput, input } = useInput({ initialValue });
  const { currentUnit, handleChangeUnit } = useSelectValue();
  const { currentNumbericUnit, handleChangeNumericUnit } = useNumericUnitSelectValue();

  return (
    <Container>
      <Label fontSize={15}>top</Label>
      <Input min={-9999} max={9999} step={1} value={input} onChange={handleChangeRangeInput} />
      <InputWrapper>
        <CommonInput
          width={90}
          height={30}
          type="number"
          suffix={currentUnit}
          value={input}
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

Object.assign(ObserverOptionForm, {});
