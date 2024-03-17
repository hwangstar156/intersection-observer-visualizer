import styled from 'styled-components';
import { Button } from '../../common/button';
import { Label } from '../../common/label';
import { theme } from '../../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

export function ObserverRootOptionButton() {
  return (
    <Container>
      <Label fontSize={20} color={'#fff'}>
        root
      </Label>
      <Button backgroundColor={theme.colors.primary} borderRadius={6} height={40}>
        {/* 사용자가 입력한 root element -> ref를 넣은경우 & document.querySelector를 넣는 경우 */}
        {/* null 넣으면 browser body에 highlight */}
        null (browser)
      </Button>
    </Container>
  );
}
