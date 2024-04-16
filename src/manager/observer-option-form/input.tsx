import { Field, useFormikContext } from 'formik';
import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { CommonInput } from '../../common/common-input';
import { FormikValue } from '../left-navigation-bar';
import { CssLengthUnit } from './css-length-unit';
import { useRootMarginInput, useSelectValue } from './hook';
import { NumericUnitSelect } from './numeric-unit-select';
import { Range } from './range';

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface InputProps {
  width: number;
  height: number;
  name: keyof FormikValue;
}

export function ThresholdInput({ width, height, name }: InputProps) {
  const { values, setFieldValue } = useFormikContext<FormikValue>();

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, { ...values[name], value: event.target.valueAsNumber });
  };

  return (
    <>
      <Range
        min={0}
        max={1}
        step={0.1}
        value={values['threshold']['value']}
        onChange={handleChangeInput}
        name={name}
      />
      <InputWrapper>
        <Field name={name}>
          {() => {
            return (
              <CommonInput
                id={name}
                width={width}
                height={height}
                type="text"
                value={values['threshold']['value']}
                disabled
                hasSuffixInput={false}
                name={name}
                onChange={handleChangeInput}
              ></CommonInput>
            );
          }}
        </Field>
      </InputWrapper>
    </>
  );
}

interface InputWithUnitProps extends InputProps {}

export function RootMarginInput({ width, height, name }: InputWithUnitProps) {
  const { handleChangeRangeInput, values, currentNumbericUnit, handleChangeNumericUnit } =
    useRootMarginInput({
      name,
    });
  const { selectValue, handleChangeUnit } = useSelectValue({ name });

  return (
    <>
      <Range
        min={-(currentNumbericUnit - 1)}
        max={currentNumbericUnit - 1}
        step={1}
        value={values[name]['value']}
        name={name}
        onChange={handleChangeRangeInput}
      />
      <InputWrapper>
        <CommonInput
          id={name}
          width={width}
          height={height}
          type="text"
          value={values[name]['value']}
          name={name}
          hasSuffixInput={true}
          onChange={handleChangeRangeInput}
        >
          <CssLengthUnit
            name={name}
            currentValue={selectValue[name]['cssLengthUnit']}
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
