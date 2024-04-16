import styled, { css } from 'styled-components';
import { Button } from '../../common/button';
import { Label } from '../../common/label';
import { theme } from '../../styles/theme';
import { useCurrentTarget } from '../context/currentTarget';
import { ActiveButton } from './active-button';
import React, { useState } from 'react';
import { CommonInput } from '../../common/common-input';
import { EmptyTargetForm } from './empty-target-form';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

const Container = styled.div<{ isChecked: boolean }>`
  opacity: 0;
  transform: translate3d(0, -100%, 0);
  transition: all 0.5s;
  position: relative;
  z-index: 0;

  ${({ isChecked }) =>
    isChecked &&
    css`
      opacity: 1;
      transform: translateZ(0);
    `};
`;

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  height: 18px;
  width: 18px;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 10px;

  position: relative;
  z-index: 1;
  padding-bottom: 50px;
`;

export function ObserverControlsForm() {
  const { currentTarget } = useCurrentTarget();
  const [isChecked, setIsChecked] = useState(false);
  const [duration, setDuration] = useState(1);

  const handleChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (typeof value === 'number' && !Number.isNaN(value)) {
      setDuration(value);
    }
  };

  if (!currentTarget) {
    return <EmptyTargetForm />;
  }

  return (
    <>
      <CheckBoxContainer>
        <CheckBox id="control-checkbox" checked={isChecked} onChange={handleChangeCheckBox} />
        <Label fontSize={14} color="#fff" htmlFor="control-checkbox">
          You can partially visualize for a moment
        </Label>
      </CheckBoxContainer>

      <div style={{ overflow: 'hidden' }}>
        <Container isChecked={isChecked}>
          <FormContainer>
            <Label fontSize={20} color={'#fff'}>
              current-target
            </Label>
            <Button
              backgroundColor={'#fff'}
              borderRadius={6}
              height={40}
              color={theme.colors.primary}
              borderColor={theme.colors.primary}
            >
              {currentTarget?.targetId}
            </Button>
          </FormContainer>

          <FormContainer>
            <Label fontSize={20} color={'#fff'}>
              root
            </Label>
            <Button
              backgroundColor={'#fff'}
              borderRadius={6}
              height={40}
              color={theme.colors.primary}
              borderColor={theme.colors.primary}
            >
              {currentTarget?.rootClassName === null
                ? 'null(browser)'
                : currentTarget?.rootClassName}
            </Button>
          </FormContainer>

          <FormContainer>
            <Label fontSize={20} color={'#fff'}>
              duration
            </Label>
            <CommonInput
              width={50}
              height={30}
              type="text"
              hasSuffixInput={false}
              value={duration}
              onChange={handleChangeDuration}
            ></CommonInput>
          </FormContainer>
        </Container>
      </div>

      <ActiveButton isChecked={isChecked} />
    </>
  );
}
