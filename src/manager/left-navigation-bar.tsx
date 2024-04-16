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
      transform: translate(-195px);
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
      emit(window, '@submit', values);
    },
  });

  useEffect(() => {
    const createActiveRectangle = ({
      x,
      y,
      bottom,
      color,
      height,
      left,
      right,
      top,
      width,
    }: CreateRectArgs) => {
      const div = document.createElement('div');

      div.style.position = 'absolute';
      div.style.left = `${x - 1}px`;
      div.style.top = `${y - 1}px`;
      div.style.width = `${width + 1}px`;
      div.style.height = `${height + 1}px`;
      div.style.border = `2px solid ${color}`;
      div.style.zIndex = '1';
      div.style.marginLeft = `${left}px`;
      div.style.marginTop = `${top}px`;
      div.style.marginRight = `${right - width}px`;
      div.style.marginBottom = `${bottom - height}px`;
      div.style.pointerEvents = 'none'; // 이렇게 할 시 네모에 상호작용 안됨.
      // div.style.transform = 'scale(0.75)';
      div.style.transition = 'opacity 100s ease-in';

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          div.style.opacity = '0';
        }),
      );

      div.addEventListener('transitionend', () => {
        document.body.removeChild(div);
      });

      document.body.append(div);
    };

    const drawRectByMessage = () => {
      window.addEventListener('message', (e) => {
        const entry = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;

        if (!entry || !Object.keys(entry).some((key) => key === 'rootBounds')) {
          return;
        }

        const rootBounds = entry.rootBounds;
        const boundingClientRect = entry.boundingClientRect;
        const $iframe = document.querySelector('.io-iframe');
        const rect = $iframe?.getBoundingClientRect() as DOMRect;

        const x = rect.left + window.scrollX - 1;
        const y = rect.top + window.scrollY - 1;

        if (!rootBounds) {
          console.log('rootBounds가 없습니다.');
          return;
        }

        createActiveRectangle({
          x,
          y,
          bottom: 0.75 * rootBounds.bottom,
          color: 'red',
          height: 0.75 * rootBounds.height,
          left: 0.75 * rootBounds.left,
          right: 0.75 * rootBounds.right,
          top: 0.75 * rootBounds.top,
          width: 0.75 * rootBounds.width,
        });

        createActiveRectangle({
          x,
          y,
          bottom: 0.75 * boundingClientRect.bottom,
          color: 'blue',
          height: 0.75 * boundingClientRect.height,
          left: 0.75 * boundingClientRect.left,
          right: 0.75 * boundingClientRect.right,
          top: 0.75 * boundingClientRect.top,
          width: 0.75 * boundingClientRect.width,
        });
      });
    };

    // drawRectByMessage();
  }, []);

  return (
    <Container isOpen={isOpen}>
      <NavigationBarHeader />
      <TabWidget />
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
