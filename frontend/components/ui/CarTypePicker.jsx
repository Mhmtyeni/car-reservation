import React, { useEffect, useState } from "react";
import { useGetCarTypesQuery } from "../../pages/slices/carType";

const CarTypePicker = ({ onSelectCarType }) => {
  const { data: carTypeData } = useGetCarTypesQuery(0, 20);
  const [selectedCarTypeId, setSelectedCarTypeId] = useState("");

  useEffect(() => {
    if (carTypeData?.carTypes.length && !selectedCarTypeId) {
      const defaultCarTypeId = carTypeData.carTypes.find(
        (type) => type.carTypeName === "Havuz"
      )?.id;
      setSelectedCarTypeId(defaultCarTypeId);
      onSelectCarType(defaultCarTypeId);
    }
  }, [carTypeData, onSelectCarType, selectedCarTypeId]);

  const handleToggleChange = (carTypeId) => {
    // Eğer zaten seçili olan öğeye tıklanırsa varsayılan değere geri dön
    if (selectedCarTypeId === carTypeId) {
      const defaultCarTypeId = carTypeData.carTypes.find(
        (type) => type.carTypeName === "Havuz"
      )?.id;
      setSelectedCarTypeId(defaultCarTypeId);
      onSelectCarType(defaultCarTypeId);
    } else {
      setSelectedCarTypeId(carTypeId);
      onSelectCarType(carTypeId);
    }
  };

  return (
    <div className="car-type-picker flex flex-col items-center justify-center">
      {carTypeData?.carTypes
        .filter((carType) => carType.carTypeName === "VIP")
        .map((carType) => (
          <div key={carType.id} className="toggle-container ">
            <div
              title="VIP"
              className={`toggle ${
                selectedCarTypeId === carType.id ? "active" : ""
              }`}
              onClick={() => handleToggleChange(carType.id)}
            >
              <div className=" marquee-container ">
                <p className="marquee font-titleTextType sm:text-base text-xs text-grayColor ">
                  {carType.carTypeName}
                </p>
              </div>
            </div>
            <div className=" font-titleTextType ml-[35%] sm:text-xs text-[8px] text-grayColor uppercase">
              vip için tıklayınız.
            </div>
          </div>
        ))}
    </div>
  );
};

export default CarTypePicker;
