import styled from 'styled-components';

const Input = ({ type, name, label, options }: { type: string; name: string; label: string; options: {} }) => {
  return (
    <InputWrapper>
      <Label htmlFor={name}>{label}</Label>
      <InputEl type={type} name={name} {...options} />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 700;
  margin-right: 12px;
  width: 80px;
`;
const InputEl = styled.input`
  font-size: ${(props) => (props.size ? props.size : 16)}px;
  :focus {
    background-color: rgba(255, 255, 255, 0.8);
    outline: 2px solid rgba(0, 0, 0, 0.3);
  }
  width: 100%;
`;

export default Input;
