import React from "react";
import { Controller } from "react-hook-form";
import InputField from "./InputField";

const ControllerFiled = ({
  id,
  name,
  control,
  rules,
  type,
  label,
  placeholder,
  maxLength,
  minLength,
  max,
  onChange,
  min,
  options = [],
  onFocus,
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    onChange={onChange}
    render={({
      field: { onChange, onBlur, value, name },
      fieldState: { error, isTouched },
    }) => (
      <InputField
        id={id}
        name={name}
        type={type}
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        errorMessage={error?.message}
        touched={isTouched}
        max={max}
        min={min}
        maxLength={maxLength}
        minLength={minLength}
        onFocus={onFocus}
      />
    )}
  />
);

export default ControllerFiled;
