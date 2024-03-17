import { css, styled } from 'styled-components';
import { useTabContext } from './context/tab';
import { useToggleContext } from './context/toggle';
import { NavigationBarHeader } from './navigation-bar-header/navigation-bar-header';
import { ObserverListWidget } from './observer-list/widget';
import { ApplyButton } from './observer-option-form/apply-button';
import { ObserverRootOptionButton } from './observer-option-form/observer-root-option-button';
import { RootMarginForm } from './observer-option-form/root-margin-form';
import { ThresholdForm } from './observer-option-form/threshold-form';
import { TabWidget } from './tabs/widget';
import { Formik, FormikHelpers, FormikProvider, useFormik } from 'formik';
import { SELECT_UNIT_LIST } from './observer-option-form/constants';

const Container = styled.div<{ isOpen: boolean }>`
  width: 250px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.black001};
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  transition: 0.3s;

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

export function LeftNavigationBar() {
  const [tabOptions] = useTabContext();
  const [isOpen] = useToggleContext();

  const formikObject = useFormik({
    initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container isOpen={isOpen}>
      <NavigationBarHeader />
      {isOpen ? (
        <>
          <TabWidget />
          {tabOptions[0].isActive ? (
            <ObserverListWidget />
          ) : (
            <FormikProvider value={formikObject}>
              <OptionFormContainer onSubmit={formikObject.handleSubmit}>
                <ObserverRootOptionButton />
                <RootMarginForm />
                <ThresholdForm />
                <ApplyButton />
              </OptionFormContainer>
            </FormikProvider>
          )}
        </>
      ) : null}
    </Container>
  );
}
