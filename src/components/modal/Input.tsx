import styled from 'styled-components';

const Input = ({ type, name, label, options }: { type: string; name: string; label: string; options: {} }) => {
  return (
    <Label htmlFor={name}>
      {label}
      <InputEl id={name} type={type} name={name} {...options} />
    </Label>
  );
};

const Label = styled.label`
  font-weight: 700;

  /* width: 80px; */
`;
const InputEl = styled.input`
  margin-left: 20px;
  font-size: ${(props) => (props.size ? props.size : 16)}px;
  :focus {
    background-color: rgba(255, 255, 255, 0.8);
    outline: 2px solid rgba(0, 0, 0, 0.3);
  }
  /* width: 100%; */
`;

export default Input;
