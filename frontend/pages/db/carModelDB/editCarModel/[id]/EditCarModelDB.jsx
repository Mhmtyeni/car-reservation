import React, { useState, useEffect } from "react";

import { notify } from "../../../../../utils/notifications";
import InputField from "../../../../../components/ui/InputField";
import {
  useGetCarModelQuery,
  useUpdateCarModelMutation,
} from "../../../../slices/carModel";
import { useGetBrandsQuery } from "../../../../slices/carBrands";

const EditCarModelDB = ({ id, closeModal }) => {
  const {
    data: carModelData,
    isLoading,
    error,
    refetch,
  } = useGetCarModelQuery(id, {
    skip: !id,
  });
  const { data: brandsData } = useGetBrandsQuery({ page: 0, size: 50 });
  const [carModelName, setCarModelName] = useState("");
  const [carBrandId, setCarBrandId] = useState("");
  const [carBrandName, setCarBrandName] = useState("");

  const [updateCarModel] = useUpdateCarModelMutation();

  useEffect(() => {
    if (carModelData) {
      setCarModelName(carModelData.carModelName);
      setCarBrandId(carModelData.carBrandId);
      setCarBrandName(carModelData.carBrandName);
    }
  }, [carModelData]);

  const handleUpdate = async () => {
    if (!carModelName || !carBrandId) {
      alert("Car model name and brand must be selected.");
      return;
    }

    const updatedCarModel = {
      carModelId: id,
      carModelName,
      carBrandId,
    };

    try {
      await updateCarModel(updatedCarModel).unwrap();
      notify.success();
      refetch();
      closeModal();
    } catch (err) {
      console.error("Error updating car model", err);
      notify.error("Car model update failed.");
    }
  };

  if (isLoading) return <p>Loading car model details...</p>;
  if (error) return <p>Error loading car model details: {error.message}</p>;

  const brandOptions =
    brandsData?.carBrands.map((brand) => ({
      value: brand.id,
      label: brand.carBrandName,
    })) || [];

  return (
    <div className="flex flex-col ">
      <div className="flex- flex-col items-center justify-between mt-10 border-collapse border-t-4 border-dashed p-4 my-2 ">
        <h2 className="text-md font-bold">Add Car Model </h2>
        <InputField
          label={"Car Model"}
          type="text"
          value={carModelName}
          onChange={(e) => setCarModelName(e.target.value)}
          placeholder="Enter new car model name"
        />

        <InputField
          label="Brand"
          type="options"
          value={carBrandId}
          onChange={(e) => {
            const selectedBrand = brandOptions.find(
              (brand) => brand.value === e.target.value
            );
            setCarBrandId(selectedBrand?.value);
            setCarBrandName(selectedBrand?.label);
          }}
          options={brandOptions}
        />
      </div>
      <div>
        <button className="buttonEdit" onClick={handleUpdate}>
          Update Model
        </button>
        <button className="buttonDelete" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCarModelDB;
