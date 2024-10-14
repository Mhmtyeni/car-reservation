import React from "react";

const TextHeader = ({ children, addClass }) => {
  return (
    <div
      className={` font-titleTextType sm:text-sm text-[10px] max-[425px]:text-[8px] flex-shrink-0 uppercase ${addClass}`}
    >
      {children}
    </div>
  );
};

export default TextHeader;
