//Zaman seçimi için kullanılan kütüphane.

import React, { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { GrAlarm } from "react-icons/gr";

export function TimeFlatpickr({
  selectedTimeKey,
  setSelectedTime,
  description,
  placeholder,
}) {
  const inputRef = useRef(null);

  const timeNow = new Date().getHours() + 1;

  useEffect(() => {
    const currentInputRef = inputRef.current;

    if (!currentInputRef) return;

    const instance = flatpickr(currentInputRef, {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      time_24hr: true,
      disableMobile: true,
      onChange: (selectedDates, dateStr) => {
        setSelectedTime((prevState) => ({
          ...prevState,
          [selectedTimeKey]: dateStr,
        }));
      },
    });

    return () => {
      if (instance) {
        instance.destroy();
      }
    };
  }, [setSelectedTime, selectedTimeKey]);
  return (
    <div className="relative flex flex-col gap-1 ">
      <span className=" sm:text-base text-[12px] capitalize ">
        {description}
      </span>
      <input
        ref={inputRef}
        readOnly
        type="text"
        placeholder={placeholder}
        className="border-none py-2 pl-3 pr-10 leading-5 text-darkGrayColor focus:outline-none focus:ring focus:ring-stone-100 sm:w-60 max-[425px]:w-32 w-40 cursor-default overflow-hidden rounded-lg sm:text-base text-[10px] bg-white text-left shadow-md focus-visible:ring-2 focus-visible:ring-white/75"
      />
      <span className="absolute inset-y-0 right-0 flex items-center pr-2 mt-6">
        <GrAlarm
          className="sm:h-3 h-2 w-3 text-darkGrayColor"
          aria-hidden="true"
        />
      </span>
    </div>
  );
}
