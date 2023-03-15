import React from "react";
import { Label, TextInput } from "flowbite-react";

const Input = ({
  labelText,
  inputId,
  type,
  placeholder,
  name,
  inputValue,
  onChange,
}) => {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={inputId} value={labelText} className="text-white" />
      </div>
      <TextInput
        id={inputId}
        type={type}
        placeholder={placeholder}
        name={name}
        value={inputValue}
        required={true}
        shadow={true}
        onChange={onChange}
        style={{
          backgroundColor: "rgb(31, 41, 55)",
          border: "none",
          color: "white",
        }}
      />
    </div>
  );
};

export default Input;
