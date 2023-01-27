const Input = ({ type, name, label, options }: { type: string; name: string; label: string; options: {} }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} {...options} />
    </div>
  );
};
export default Input;
