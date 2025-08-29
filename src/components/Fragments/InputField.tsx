"use client";

import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  placeholder,
  required = false,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-semibold text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputField;
