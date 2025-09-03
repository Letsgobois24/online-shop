const Label = ({ name, label }: { name: string; label: string }) => {
  return (
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-semibold text-gray-900"
    >
      {label}
    </label>
  );
};

export default Label;
