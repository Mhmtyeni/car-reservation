//Genel hatlarıyla uygulama içinde kullanılan İnput Component.
import React, { useEffect, useState } from "react";

const InputField = ({
  label,
  name,
  type,
  value = "",
  placeholder,
  options = [],
  onChange,
  onFocus,
  errorMessage,
  touched,
  selected,
  maxLength,
  minLength,
  min,
  max,
  readOnly = false,
  ...inputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [validationError, setValidationError] = useState("");

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  useEffect(() => {
    if (type === "number") {
      if (inputValue !== "" && (inputValue < min || inputValue > max)) {
        {
          setValidationError(`Değer ${min} ile ${max} arasında olmalı.`);
        }
      } else {
        setValidationError("");
      }
    }

    if (name === "tc") {
      const tc = inputValue;

      // TC kimlik numarası sadece rakamlardan oluşmalı
      if (!/^[0-9]+$/.test(tc)) {
        setValidationError(
          "TC Kimlik Numarası sadece rakamlardan oluşmalıdır."
        );
        return;
      }

      // İlk karakter sıfır olamaz
      if (tc[0] === "0") {
        setValidationError("TC Kimlik Numarası 0 ile başlayamaz.");
        return;
      }

      // TC kimlik numarasını sayısal değerlere çevir
      const digits = tc.split("").map(Number);

      const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
      const evenSum = digits[1] + digits[3] + digits[5] + digits[7];

      // 10. basamak kontrolü
      const tenthDigit = (oddSum * 7 - evenSum) % 10;
      if (tenthDigit !== digits[9]) {
        setValidationError("TC Kimlik Numarası hatalıdır.");
        return;
      }

      // 11. basamak kontrolü
      const totalSum = oddSum + evenSum + digits[9];
      const eleventhDigit = totalSum % 10;
      if (eleventhDigit !== digits[10]) {
        setValidationError("TC Kimlik Numarası hatalıdır.");
        return;
      }
      // TC kimlik numarası 11 karakter değilse geçersiz
      if (tc.length !== 11) {
        setValidationError("TC Kimlik Numarası 11 haneli olmalıdır.");
        return;
      }

      setValidationError("");
    }
  }, [inputValue, min, max, type]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (validationError) {
      return;
    }
    if (onChange) {
      onChange(e); // Olayı üst bileşene geçir
    }
  };
  if (type === "options") {
    return (
      <div className="relative cursor-text flex justify-between items-center py-1 w-auto">
        <label
          htmlFor={name}
          className="flex-shrink-0 w-36 md:text-sm text-xs font-medium capitalize text-darkColor"
        >
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={inputValue}
          onChange={handleChange}
          className={`InputFields md:text-md text-xs md:h-12 h-10 border w-full border-darkColor shadow-sm outline-none px-4 ${
            validationError ? "border-redColor" : "border-grayColor"
          }`}
        >
          <option value="" disabled hidden>
            {"Seçiniz"}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="relative cursor-default select-none py-2 pl-10 pr-4"
            >
              {option.label}
            </option>
          ))}
        </select>
        {validationError && isFocused && (
          <p className="text-red-600 text-sm">{validationError}</p>
        )}
      </div>
    );
  }

  return (
    <div className="relative cursor-text flex justify-between items-center py-1 w-auto">
      <label
        htmlFor={name}
        className=" flex-shrink-0 w-36 md:text-sm text-xs font-medium text-darkColor"
      >
        {label}
      </label>
      <input
        className={`InputFields md:h-12 h-10 border w-full border-darkColor shadow-sm outline-none px-4  ${
          touched && validationError ? "border-redColor" : "border-grayColor"
        }`}
        autoComplete="off"
        required
        {...inputProps}
        type={type}
        id={name}
        name={name}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={readOnly}
        min={min}
        max={max}
        maxLength={maxLength}
        minLength={minLength}
        onFocus={handleFocus}
      />
      {isFocused && validationError && (
        <p
          id="errorInfo"
          className="mt-8 text-red-600 absolute left-36 text-[10px]"
        >
          {validationError}
        </p>
      )}
    </div>
  );
};

export default InputField;
