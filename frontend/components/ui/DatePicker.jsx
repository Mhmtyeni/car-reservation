//Tarih seçimi için kullanılan kütüphane.

"use client";
import React, { useState, useEffect, useRef } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays, differenceInDays } from "date-fns";
import tr from "date-fns/locale/tr";
import { format } from "date-fns";
import { GrFormDown } from "react-icons/gr";

export function DatePicker({ setSelectedDate }) {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [warning, setWarning] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const refCalen = useRef(null);

  const closeDate = (event) => {
    if (refCalen.current && !refCalen.current.contains(event.target)) {
      setOpenDate(false);
      setWarning(false);
    }
  };

  //Responsive olması adına sayfa boyutuna göre özellikler burda verildi.
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 980);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    document.addEventListener("click", closeDate, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", closeDate, true);
    };
  }, []);

  const handleChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    //Seçilen tarihten bir önceki günü aldığı için burda tarih formatlandı. Standart hale getirildi.
    const utcStartDate = new Date(
      Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      )
    );
    const utcEndDate = new Date(
      Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
    );

    if (differenceInDays(utcEndDate, utcStartDate) > 2) {
      setWarning("En fazla 3 gün seçebilirsiniz");
    } else {
      setWarning("");
      setDate({
        ...ranges.selection,
        startDate: utcStartDate,
        endDate: utcEndDate,
      });
      setSelectedDate({
        ...ranges.selection,
        startDate: utcStartDate,
        endDate: utcEndDate,
      });
    }
  };

  const handleClick = () => {
    setOpenDate((prev) => !prev);
  };

  return (
    <div ref={refCalen}>
      <div
        onClick={handleClick}
        className=" flex lg:flex-col justify-between cursor-pointer gap-2"
      >
        <div className="relative flex flex-col gap-1">
          <span className="sm:text-base text-[12px]">Alış Tarihi</span>
          <input
            className="border-none py-2 pl-3 pr-10 leading-5 text-darkGrayColor focus:outline-none focus:ring focus:ring-stone-100 sm:w-60 max-[425px]:w-32 w-40 cursor-default overflow-hidden rounded-lg sm:text-base text-[10px] bg-white text-left shadow-md focus-visible:ring-2 focus-visible:ring-white/75"
            readOnly
            placeholder="GG/AA/YYYY"
            value={format(date.startDate, "dd/MM/yyyy", { locale: tr })}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 mt-6">
            <GrFormDown
              className="sm:h-5 h-3 w-5 text-darkGrayColor"
              aria-hidden="true"
            />
          </span>
        </div>
        <div className="relative flex flex-col gap-1">
          <span className="sm:text-base text-[12px]">Bırakış Tarihi</span>
          <input
            className="border-none py-2 pl-3 pr-10 leading-5 text-darkGrayColor focus:outline-none focus:ring focus:ring-stone-100 sm:w-60 max-[425px]:w-32 w-40 cursor-default overflow-hidden rounded-lg sm:text-base text-[10px] bg-white text-left shadow-md focus-visible:ring-2 focus-visible:ring-white/75"
            readOnly
            placeholder="GG/AA/YYYY"
            value={format(date.endDate, "dd/MM/yyyy", { locale: tr })}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 mt-6">
            <GrFormDown
              className="sm:h-5 h-3 w-5 text-darkGrayColor"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
      <div className="absolute md:w-[22rem] sm:w-72 w-80 flex flex-col justify-center items-center mt-2 px-4 z-[9999999] bg-white">
        {openDate && (
          <DateRangePicker
            ranges={[date]}
            months={2}
            minDate={new Date()}
            maxDate={addDays(new Date(), 13)}
            direction={isSmallScreen ? "vertical" : "horizontal"}
            onChange={handleChange}
            rangeColors={["#c23031"]}
            dragSelectionEnabled={true}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            locale={tr}
            showDateDisplay={false}
            staticRanges={[]}
            inputRanges={[]}
          />
        )}
        {warning && <span className="text-red-500 font-bold">{warning}</span>}
      </div>
    </div>
  );
}
