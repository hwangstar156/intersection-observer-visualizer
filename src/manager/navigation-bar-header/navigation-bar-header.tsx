import styled from 'styled-components';
import { useToggleContext } from '../context/toggle';

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.black001};
  padding: 0 1.1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  font-size: 25px;
`;

const ToggleContainer = styled.div`
  cursor: pointer;
  color: white;
`;

export function NavigationBarHeader() {
  return (
    <Container>
      <Logo />
      <Toggle />
    </Container>
  );
}

function Logo() {
  return <LogoContainer>👀</LogoContainer>;
}

function Toggle() {
  const [isOpen, setOpen] = useToggleContext();

  const src = isOpen
    ? '../../../public/icon-arrow-left-small-mono.svg'
    : '../../../public/icon-arrow-right-small-mono.svg';

  const handleClickToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <ToggleContainer onClick={handleClickToggle}>
      <img width={25} height={25} src={src} />
    </ToggleContainer>
  );
}
