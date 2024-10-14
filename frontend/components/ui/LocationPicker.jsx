import React, { useState, useEffect } from "react";
import { useGetLocationsQuery } from "../../pages/slices/carLocations";
import ComboboxField from "./ComboboxField";

const LocationPicker = ({ description, onSelect, value, isDisabled }) => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);

  const { data: carLocationDatas } = useGetLocationsQuery({ page, size });

  const locations = carLocationDatas?.locations || [];

  const handleSelect = (selectedLocation) => {
    if (onSelect && !isDisabled && selectedLocation) {
      onSelect(selectedLocation.id);
    }
  };

  return (
    <div className="relative flex flex-col gap-1 ">
      <span className="sm:text-base text-[12px] capitalize">{description}</span>
      {isDisabled ? (
        <input
          readOnly
          type="text"
          placeholder="Bırakış yeri seçiniz."
          value={
            value
              ? locations.find((location) => location.id === value)
                  ?.locationName
              : ""
          }
          className="border-none py-2 pl-3 pr-10 leading-5 text-darkGrayColor focus:outline-none focus:ring focus:ring-stone-100 sm:w-60 max-[425px]:w-32 w-40 cursor-default overflow-hidden rounded-lg sm:text-base text-[10px] bg-white text-left shadow-md "
        />
      ) : (
        <ComboboxField
          options={locations}
          placeholder="Alış yeri seçiniz."
          selectedValue={locations.find((location) => location.id === value)}
          onChange={handleSelect}
          labelKey="locationName"
          valueKey="id"
          placeholderCombobox=""
          buttonClassName="border-none py-2 pl-3 pr-10 leading-5 text-darkGrayColor focus:outline-none focus:ring focus:ring-stone-100 sm:w-60 max-[425px]:w-32 w-40 cursor-default overflow-hidden rounded-lg sm:text-base text-[10px] bg-white text-left shadow-md focus-visible:ring-2 focus-visible:ring-white/75"
        />
      )}
    </div>
  );
};

export default LocationPicker;
