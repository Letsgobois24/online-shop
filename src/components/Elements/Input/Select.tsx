import Label from "./Label";

type Options = {
  label: string;
  value: string;
};

type SelectTypeProps = {
  label: string;
  type?: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  options: Options[];
};

const Select = ({
  label,
  name,
  required = false,
  defaultValue = "",
  className = "",
  disabled = false,
  options,
}: SelectTypeProps) => {
  return (
    <>
      <Label name={name} label={label} />
      <select
        id={name}
        className={`${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5`}
        disabled={disabled}
        defaultValue={defaultValue}
        required={required}
      >
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
