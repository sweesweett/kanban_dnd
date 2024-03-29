import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Label } from './Input';
import { useRecoilValue } from 'recoil';
import { listAtom } from '../../store';

const ModalSelect = ({ state }: { state: string }) => {
  const [stateValue, setStateValue] = useState<string>(state);
  const stateSelect = useRecoilValue(listAtom);
  useEffect(() => {
    setStateValue(state);
  }, [state]);
  return (
    <>
      <Label htmlFor="state">상태</Label>
      <SelectEl
        value={stateValue}
        name="state"
        id="state"
        required
        onInput={(e) => setStateValue(e.currentTarget.value)}
      >
        {stateSelect?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </SelectEl>
    </>
  );
};

const SelectEl = styled.select`
  padding: 8px;
  border: none;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.listBg};
  :focus {
    outline: 2px solid rgba(0, 0, 0, 0.3);
  }
`;
export default ModalSelect;
