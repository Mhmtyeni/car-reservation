import React from "react";
import translations from "../uicustom/translations.json";

const carPropsKeys = [
  "carBrandName",
  "carModelName",
  "carKM",
  "carFuelStatus",
  "carCapacity",
  "locationName",
  "companyName",
  "carTypeName",
];
const RezCarDetay = ({ car }) => {
  return (
    <div>
      <div className="flex flex-col w-full">
        {carPropsKeys.map((key) => (
          <div
            key={key}
            className="flex justify-between items-start mb-5 px-8  border-collapse border-b-2 border-darkGrayColor/50"
          >
            <h2>{translations[key] || key}:</h2>
            <h2 className="font-textTextType font-bold text-darkColor">
              {car[key].toString() || ""}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RezCarDetay;
