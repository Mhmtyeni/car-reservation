import React, { useState, useEffect } from "react";

import {
  useGetBrandQuery,
  useUpdateBrandMutation,
} from "../../../../slices/carBrands";
import { notify } from "../../../../../utils/notifications";
import InputField from "../../../../../components/ui/InputField";

const EditBrandDB = ({ id, closeModal }) => {
  const {
    data: brandData,
    isLoading,
    error,
    refetch,
  } = useGetBrandQuery(id, {
    skip: !id,
  });
  const [carBrandName, setCarBrandName] = useState("");

  const [updateBrand] = useUpdateBrandMutation();

  useEffect(() => {
    if (brandData) {
      setCarBrandName(brandData.carBrandName);
    }
  }, [brandData]);

  const handleUpdate = async () => {
    if (!carBrandName) {
      alert("Brand name cannot be empty.");
      return;
    }

    const updatedBrand = {
      carBrandId: id,
      carBrandName,
    };

    try {
      await updateBrand(updatedBrand).unwrap();
      notify.success();
      refetch();
      closeModal();
    } catch (err) {
      console.error("Error updating brand", err);
    }
  };

  if (isLoading) return <p>Loading brand details...</p>;
  if (error) return <p>Error loading brand details: {error.message}</p>;

  return (
    <div className="flex flex-col ">
      <div className="flex- flex-col items-center justify-between mt-10 border-collapse border-t-4 border-dashed p-4 my-2 ">
        <h2 className="text-md font-bold">Add Brands</h2>

        <InputField
          label={"Brand Name"}
          type="text"
          value={carBrandName}
          onChange={(e) => setCarBrandName(e.target.value)}
          placeholder="Enter new brand name"
        />
      </div>
      <div>
        <button className="buttonEdit" onClick={handleUpdate}>
          Update Brand
        </button>
        <button className="buttonDelete" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditBrandDB;
