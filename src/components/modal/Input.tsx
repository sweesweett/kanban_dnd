import styled from 'styled-components';

const Input = ({ type, name, label, options }: { type: string; name: string; label: string; options: object }) => {
  return (
    <Label htmlFor={name}>
      {label}
      <InputEl id={name} type={type} name={name} {...options} />
    </Label>
  );
};

export const Label = styled.label`
  font-weight: 700;
`;
const InputEl = styled.input`
  margin-left: 20px;
  color: ${({ theme }) => theme.color};
  font-size: ${(props) => (props.size ? props.size : 16)}px;
  :focus {
    background-color: ${({ theme }) => theme.listBg};
    outline: 2px solid rgba(0, 0, 0, 0.3);
  }
`;

export default Input;
