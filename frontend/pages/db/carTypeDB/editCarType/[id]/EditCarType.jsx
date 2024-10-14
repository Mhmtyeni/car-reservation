import React, { useState, useEffect } from "react";

import { notify } from "../../../../../utils/notifications";
import InputField from "../../../../../components/ui/InputField";
import {
  useGetCarTypeQuery,
  useUpdateCarTypeMutation,
} from "../../../../slices/carType";

const EditCarType = ({ id, closeModal }) => {
  const {
    data: carTypeData,
    isLoading,
    error,
    refetch,
  } = useGetCarTypeQuery(id, {
    skip: !id,
  });
  const [carTypeName, setCarTypeName] = useState("");

  const [updateCarType] = useUpdateCarTypeMutation();

  useEffect(() => {
    if (carTypeData) {
      setCarTypeName(carTypeData.carTypeName);
    }
  }, [carTypeData]);

  const handleUpdate = async () => {
    if (!carTypeName) {
      alert("Brand name cannot be empty.");
      return;
    }

    const updatedCarType = {
      carTypeId: id,
      carTypeName,
    };

    try {
      await updateCarType(updatedCarType).unwrap();
      notify.success();
      refetch();
      closeModal();
    } catch (err) {
      console.error("Error updating car types", err);
    }
  };

  if (isLoading) return <p>Loading car types details...</p>;
  if (error) return <p>Error loading car types details: {error.message}</p>;

  return (
    <div className="flex flex-col ">
      <div className="flex- flex-col items-center justify-between mt-10 border-collapse border-t-4 border-dashed p-4 my-2 ">
        <h2 className="text-md font-bold">Add Car Types</h2>
        <InputField
          label={"Car Type Name"}
          type="text"
          value={carTypeName}
          onChange={(e) => setCarTypeName(e.target.value)}
          placeholder="Enter New Car Type Name"
        />
      </div>
      <div>
        <button className="buttonEdit" onClick={handleUpdate}>
          Update Car Type
        </button>
        <button className="buttonDelete" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCarType;
