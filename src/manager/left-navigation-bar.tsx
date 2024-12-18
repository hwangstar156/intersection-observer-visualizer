import { css, styled } from 'styled-components';
import { useCurrentTabContext } from './context/tab';
import { useToggleContext } from './context/toggle';
import { NavigationBarHeader } from './navigation-bar-header/navigation-bar-header';
import { ObserverListWidget } from './observer-list/widget';
import { ApplyButton } from './observer-option-form/apply-button';
import { RootMarginForm } from './observer-option-form/root-margin-form';
import { ThresholdForm } from './observer-option-form/threshold-form';
import { TabWidget } from './tabs/widget';
import { FormikProvider, useFormik } from 'formik';
import { SELECT_UNIT_LIST } from './observer-option-form/constants';
import { emit } from '../util/custom-event';
import { useEffect } from 'react';
import { useCurrentId } from './context/currentId';
import { match } from 'ts-pattern';
import { ObserverControlsForm } from './observer-controls-form/observer-controls-form';
import { parentToIframeEventEmitter } from '../util/messageEvent';

const Container = styled.div<{ isOpen: boolean }>`
  width: 300px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.black001};
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  transition: 0.3s;
  overflow-y: auto;

  ${({ isOpen }) =>
    !isOpen &&
    css`
      transform: translate(-240px);
    `}
`;

const OptionFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 1.3rem;
  margin-top: 30px;
`;

const ControlFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 1.3rem;
  margin-top: 30px;
  height: 85%;
`;

interface ValueFormat {
  value: number;
  cssLengthUnit: (typeof SELECT_UNIT_LIST)[number];
}

export interface FormikValue {
  top: ValueFormat;
  left: ValueFormat;
  right: ValueFormat;
  bottom: ValueFormat;
  threshold: ValueFormat;
}

const initialValues = {
  top: {
    value: 0,
    cssLengthUnit: 'px',
  },
  left: {
    value: 0,
    cssLengthUnit: 'px',
  },
  right: {
    value: 0,
    cssLengthUnit: 'px',
  },
  bottom: {
    value: 0,
    cssLengthUnit: 'px',
  },
  threshold: {
    value: 0,
  },
};
export type IntersectionObserverOptionFormType = typeof initialValues;

interface CreateRectArgs {
  x: number;
  y: number;
  bottom: number;
  color: string;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
}

export function LeftNavigationBar() {
  const [currentTab] = useCurrentTabContext();
  const [isOpen] = useToggleContext();
  const [currentId] = useCurrentId();

  const formikObject = useFormik({
    initialValues,
    onSubmit: (values) => {
      // customEvent로 values 정보 보내기

      parentToIframeEventEmitter.emit(JSON.stringify({ key: 'optionData', data: values }));
    },
  });

  return (
    <Container isOpen={isOpen}>
      <NavigationBarHeader />
      {isOpen ? <TabWidget /> : null}
      {isOpen ? (
        <>
          {match(currentTab)
            .with('CATEGORY', () => <ObserverListWidget />)
            .with('OPTIONS', () => (
              <FormikProvider value={formikObject}>
                <OptionFormContainer onSubmit={formikObject.handleSubmit}>
                  <RootMarginForm />
                  <ThresholdForm />
                  <ApplyButton />
                </OptionFormContainer>
              </FormikProvider>
            ))
            .with('CONTROLS', () => (
              <ControlFormContainer>
                <ObserverControlsForm />
              </ControlFormContainer>
            ))
            .otherwise(() => null)}
        </>
      ) : null}
    </Container>
  );
}
