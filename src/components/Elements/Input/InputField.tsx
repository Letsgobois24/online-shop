"use client";

import React, { ChangeEvent } from "react";
import Label from "./Label";

interface InputFieldProps {
  label: string;
  type?: "text" | "number" | "password" | "email";
  name: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
  className?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  placeholder,
  required = false,
  defaultValue = "",
  className = "",
  disabled = false,
  onChange,
}) => {
  return (
    <>
      <Label name={name} label={label} />
      <input
        type={type}
        name={name}
        id={name}
        className={`${className} disabled:bg-gray-200 disabled:border-gray-400 disabled:opacity-70 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 shadow`}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      />
    </>
  );
};

export default InputField;
