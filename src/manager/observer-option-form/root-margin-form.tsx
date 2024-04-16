import styled from 'styled-components';
import { Label } from '../../common/label';
import { FormikValue } from '../left-navigation-bar';
import { RootMarginInput } from './input';

const RootMarginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 450px;
  margin-bottom: 80px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const ROOT_MARGIN_OPTIONS = ['top', 'right', 'bottom', 'left'] as const;

export function RootMarginForm() {
  return (
    <RootMarginContainer>
      <Label fontSize={20} color={'#fff'}>
        rootMargin
      </Label>
      {ROOT_MARGIN_OPTIONS.map((option) => (
        <RootMarginSubForm label={option} name={option} />
      ))}
    </RootMarginContainer>
  );
}

export function RootMarginSubForm({ label, name }: { label: string; name: keyof FormikValue }) {
  return (
    <Container>
      <Label fontSize={15}>{label}</Label>
      <RootMarginInput height={30} width={90} name={name} />
    </Container>
  );
}
