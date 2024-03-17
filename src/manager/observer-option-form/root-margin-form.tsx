import styled from 'styled-components';
import { Label } from '../../common/label';
import { RootMarginInput } from './input';

const RootMarginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 450px;
  margin-bottom: 30px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const ROOT_MARGIN_OPTIONS = ['top', 'right', 'bottom', 'left'];

export function RootMarginForm() {
  return (
    <RootMarginContainer>
      <Label fontSize={20} color={'#fff'}>
        rootMargin
      </Label>
      {ROOT_MARGIN_OPTIONS.map((option) => (
        <RootMarginSubForm label={option} />
      ))}
    </RootMarginContainer>
  );
}

export function RootMarginSubForm({ label }: { label: string }) {
  return (
    <Container>
      <Label fontSize={15}>{label}</Label>
      <RootMarginInput height={30} width={90} initialValue={0} />
    </Container>
  );
}
