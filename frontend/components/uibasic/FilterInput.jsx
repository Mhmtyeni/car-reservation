import React from "react";

const FilterInput = ({ checked, value, onChange, placeholder, ico, type }) => {
  return (
    <div className="justify-center items-center flex relative cursor-pointer w-full">
      <label className="flex items-center gap-2">
        {type === "checkbox" ? (
          <input
            type="checkbox"
            className="sm:w-4 sm:h-4 h-3 w-3 cursor-pointer appearance-none rounded-full border-[1px] border-darkGrayColor/30 checked:bg-redColor"
            checked={checked}
            onChange={onChange}
          />
        ) : (
          <input
            type={type}
            className="sm:h-14 h-11 sm:w-80 w-50 border shadow-xl border-darkGrayColor/30 sm:pl-12 pl-6 p-4 flex justify-center items-center rounded-full bg-white cursor-pointer sm:text-sm text-[12px] outline-none px-4 peer"
            required={type !== "checkbox"}
            value={value}
            onChange={onChange}
          />
        )}
        <span className="absolute top-0 mx-6 p-2 flex text-darkGrayColor/80 items-center justify-center gap-1 h-full rounded-full peer-focus:h-6 peer-focus:text-xs peer-focus:border-t peer-focus:border-darkGrayColor sm:peer-valid:h-6 peer-valid:h-5 peer-valid:text-xs peer-focus:-top-3 peer-focus:bg-white transition-all duration-10 ">
          <span className="relative sm:text-sm text-[9px]">{ico}</span>
          <span className="sm:text-sm text-[8px] font-thin font-titleTextType uppercase">
            {placeholder}
          </span>
        </span>
      </label>
    </div>
  );
};

export default FilterInput;
