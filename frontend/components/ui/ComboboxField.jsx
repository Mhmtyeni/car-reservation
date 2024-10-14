import { Fragment } from "react";
import Image from "next/image";
import { Combobox, Transition } from "@headlessui/react";

const ComboboxField = ({
  options,
  placeholder,
  selectedValue,
  onChange,
  labelKey,
  valueKey,
  iconSrc,
  buttonClassName,
  buttonProps,
  labelClassName,
  placeholderCombobox,
}) => {
  return (
    <div className="relative InputFields">
      <Combobox value={selectedValue} onChange={onChange}>
        <div className="relative ">
          <div className="flex items-center">
            <label className={`${labelClassName}`}>{placeholderCombobox}</label>
            <Combobox.Button
              className={`relative md:text-md text-xs h-10 py-2 pl-4 pr-4 text-left bg-white border  InputFields focus:outline-none focus:ring-2 focus:ring-blue-500 ${buttonClassName}`}
              {...buttonProps}
            >
              {iconSrc && (
                <Image
                  src={iconSrc}
                  alt=""
                  width={20}
                  height={20}
                  className="absolute left-3 top-2"
                />
              )}
              <span className={`block truncate`}>
                {selectedValue ? selectedValue[labelKey] : placeholder}
              </span>
            </Combobox.Button>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute z-50 max-h-40 min-w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
              {options.length === 0 ? (
                <div className="relative cursor-default  select-none py-2 pl-4 pr-4 text-gray-400">
                  Seçenek Bulunamadı.
                </div>
              ) : (
                options.map((item) => (
                  <Combobox.Option
                    key={item[valueKey]}
                    className={({ active }) => `
                     relative  cursor-default select-none py-4 pl-4 pr-4 md:text-md text-xs md:h-12 h-10
                     ${
                       active
                         ? "bg-[#C23031]/80 text-white"
                         : " font-textTextType"
                     }`}
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item[labelKey]}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default ComboboxField;
