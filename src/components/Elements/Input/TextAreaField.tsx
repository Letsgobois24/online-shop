"use client";

import React, { ChangeEvent } from "react";
import Label from "./Label";

interface TextAreaFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
  className?: string;
  disabled?: boolean;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  name,
  placeholder,
  required = false,
  defaultValue = "",
  className = "",
  disabled = false,
}) => {
  return (
    <>
      <Label name={name} label={label} />
      <textarea
        name={name}
        id={name}
        className={`${className} disabled:bg-gray-200 disabled:border-gray-400 disabled:opacity-70 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 shadow`}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </>
  );
};

export default TextAreaField;
