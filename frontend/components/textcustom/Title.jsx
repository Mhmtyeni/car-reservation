import React from "react";

const Title = ({ children, addClass }) => {
  return (
    <div
      className={` lg:text-xl md:text-[16px]
      sm:text-[14px] max-[640px]:text-[12px] 
      max-[599px]:text-[10px] lg:tracking-[2rem] md:tracking-[20px] sm:tracking-[18px] 
      max-[640px]:tracking-[14px] max-[599px]:tracking-[10px] text-redColor
      font-titleTextType uppercase
      lg:left-24 md:left-4 left-8 min-[1140px]:left-40 min-[1440px]:left-[310px]
      md:top-11 sm:top-10 top-8
       ${addClass}`}
    >
      {children}
    </div>
  );
};

export default Title;
