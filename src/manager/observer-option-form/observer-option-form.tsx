import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { CommonInput } from '../../common/common-input';
import { Label } from '../../common/label';
import { useInput, useSelectValue } from './hook';
import { Input } from './input';
import { Select } from './select';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.3rem;
  gap: 9px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface ObserverOptionFormProps {
  initialValue: number;
}

export function ObserverOptionForm({ initialValue }: ObserverOptionFormProps) {
  const { handleChangeRangeInput, input } = useInput({ initialValue });
  const { currentUnit, handleChangeUnit } = useSelectValue();

  return (
    <Container>
      <Label fontSize={15}>top</Label>
      <Input min={-9999} max={9999} step={1} value={input} onChange={handleChangeRangeInput} />
      <InputWrapper>
        <CommonInput
          width={70}
          height={30}
          type="number"
          suffix={currentUnit}
          value={input}
          onChange={handleChangeRangeInput}
        />
        <Select height={30} width={100} currentValue={currentUnit} onChange={handleChangeUnit} />
      </InputWrapper>
    </Container>
  );
}

Object.assign(ObserverOptionForm, {});
