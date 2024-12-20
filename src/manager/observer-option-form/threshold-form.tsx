import { styled } from 'styled-components';
import { Label } from '../../common/label';
import { ThresholdInput } from './input';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 120px;
`;

export function ThresholdForm() {
  return (
    <Container>
      <Label fontSize={20} color={'#fff'}>
        threshold
      </Label>
      <ThresholdInput height={30} width={35} name="threshold" />
    </Container>
  );
}
