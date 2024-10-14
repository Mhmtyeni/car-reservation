import React, { useState, useEffect } from "react";

import { notify } from "../../../../../utils/notifications";
import InputField from "../../../../../components/ui/InputField";
import {
  useGetEngineTypeQuery,
  useUpdateEngineTypeMutation,
} from "../../../../slices/carEngineType";

const EditEngineTypeDB = ({ id, closeModal }) => {
  const {
    data: engineType,
    isLoading,
    error,
    refetch,
  } = useGetEngineTypeQuery(id, {
    skip: !id,
  });
  const [carEngineTypeName, setCarEngineTypeName] = useState("");

  const [updateEngine] = useUpdateEngineTypeMutation();

  useEffect(() => {
    if (engineType) {
      setCarEngineTypeName(engineType.carEngineTypeName);
    }
  }, [engineType]);

  const handleUpdate = async () => {
    if (!carEngineTypeName) {
      alert("Engine Type name cannot be empty.");
      return;
    }

    const updatedEngine = {
      carEngineTypeId: id,
      carEngineTypeName,
    };

    try {
      await updateEngine(updatedEngine).unwrap();
      notify.success();
      refetch();
      closeModal();
    } catch (err) {
      console.error("Error updating engine type", err);
    }
  };

  if (isLoading) return <p>Loading engine type details...</p>;
  if (error) return <p>Error loading engine type details: {error.message}</p>;

  return (
    <div className="flex flex-col ">
      <div className="flex- flex-col items-center justify-between mt-10 border-collapse border-t-4 border-dashed p-4 my-2 ">
        <h2 className="text-md font-bold">Add Engine Type</h2>
        <InputField
          label={"Engine Type Name"}
          type="text"
          value={carEngineTypeName}
          onChange={(e) => setCarEngineTypeName(e.target.value)}
          placeholder="Enter new Engine Type name"
        />
      </div>
      <div>
        <button className="buttonEdit" onClick={handleUpdate}>
          Update Engine Type
        </button>
        <button className="buttonDelete" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditEngineTypeDB;
