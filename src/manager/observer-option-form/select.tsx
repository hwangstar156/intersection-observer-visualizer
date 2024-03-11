import styled from 'styled-components';

const StyledSelect = styled.select`
  background-color: #666;
  color: white;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid transparent;

  &:focus {
    outline: none;
  }
`;

export function Select() {
  return (
    <StyledSelect name="optionUnit">
      <option value="%">as percent</option>
      <option value="px">as pixel</option>
    </StyledSelect>
  );
}
